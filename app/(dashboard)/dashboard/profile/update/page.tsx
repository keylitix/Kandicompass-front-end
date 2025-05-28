"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Formik, Form, Field, ErrorMessage, useField, useFormikContext } from "formik"

import * as Yup from "yup"
import { MapPin, Bell, Camera, Save, User, Mail, Phone, Shield, Eye } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useGetUserByIdQuery, useUploadProfilePictureMutation } from "@/redux/api/userApi"
import { useAppSelector } from "@/app/hook/useReduxApp"
import Input from "@/app/_components/custom-ui/Input"
import { GradientButton } from "@/app/_components/custom-ui/GradientButton"
import { CORE_BACKEND_URL } from "@/helper/path"
import { DEFAULT_PROFILE_PICTURE } from "@/lib/variables"
import { userDataUpdateRequest } from "@/app/types/UserType"
import PhoneInput from "@/app/_components/custom-ui/PhoneInput"
import {
    Drawer,
    DrawerContent,
    DrawerClose,
} from "@/components/ui/drawer"

// Validation schema
const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    bio: Yup.string().max(500, "Bio must be less than 500 characters"),
    phone: Yup.string().matches(/^[+]?[1-9][\d]{0,15}$/, "Invalid phone number"),
    website: Yup.string().url("Invalid website URL"),
    location: Yup.string().max(100, "Location must be less than 100 characters"),
})


export default function UpdateProfilePage() {
    const { user } = useAppSelector(state => state.auth)
    const userId = user?.id || "";
    const { data, isLoading: isLoadingUser, refetch: refetchUser, isFetching: isFetchingUser } = useGetUserByIdQuery({ id: userId });
    const userData = data?.data?.[0] || null;
    const [uploadProfilePicture, { isLoading: isUploading }] = useUploadProfilePictureMutation();
    const [open, setOpen] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleClose = () => setOpen(false);
    console.log('userDatauserDatauserData', userData)


    const locationInputRef = useRef<HTMLInputElement>(null);
    const { setFieldValue } = useFormikContext();

    const initialValues = {
        fullName: userData?.fullName || '',
        email: userData?.email || '',
        bio: userData?.bio || '',
        phoneNumber: userData?.phoneNumber || '',
        notifications: {
            email: userData?.notifications?.email || false,
            push: userData?.notifications?.push || false,
            sms: userData?.notifications?.sms || false,
            marketing: userData?.notifications?.marketing || false,
        },
        privacy: {
            profileVisible: userData?.privacy?.profileVisible || false,
            showEmail: userData?.privacy?.showEmail || false,
            showPhone: userData?.privacy?.showPhone || false,
        },
        location: {
            city: userData?.location?.city || '',
            country: userData?.location?.country || '',
            lat: userData?.location?.lat || 0,
            lon: userData?.location?.lon || 0,
        },
    }


    const [field, helpers] = useField(initialValues.location.city);
    useEffect(() => {
        if (!window.google || !locationInputRef.current) return;

        const autocomplete = new google.maps.places.Autocomplete(locationInputRef.current, {
            types: ['geocode'],
            componentRestrictions: { country: ['us', 'in'] },
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.formatted_address) {
                setFieldValue(initialValues.location.city, place.formatted_address);
            }
        });
    }, [locationInputRef]);

    console.log('initialValues', initialValues)

    // profile picture change handler
    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            await uploadProfilePicture({ id: userId, file: file });
        }
    }

    // Form submission handler
    const handleSubmit = async (values: userDataUpdateRequest) => {
        setIsSubmitting(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            console.log("Profile updated:", values)
        } catch (error) {
            console.error("Error updating profile:", error)
        } finally {
            setIsSubmitting(false)
        }
    }


    // If user data is not found, refetch user data
    useEffect(() => {
        if (!user && !userId) {
            refetchUser();
        }
    }, [user, refetchUser])

    console.log("User from auth state:", userData)

    return (
        <div className="container mx-auto mt-8 px-6 pb-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#00D1FF] mb-2">Update Profile</h1>
                <p className="text-[#8a86a0]">Manage your account settings and preferences</p>
            </div>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize={true}>
                {({ values, setFieldValue, errors, touched }) => (
                    console.log("Form values:", values),
                    <Form className="space-y-8">
                        {/* Avatar Section */}
                        <div className="bg-[#1c102b] border border-[#3f2e6a] border-opacity-70 rounded-xl p-6 space-y-6">
                            <div>
                                <div className="text-[#00D1FF] flex items-center">
                                    <Camera className="mr-2" size={20} />
                                    <h2 className="text-lg font-bold">Profile Picture</h2>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center space-x-6">
                                    <div className="relative">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border border-[#3f2e6a] shadow-lg relative">
                                            {(isUploading || isFetchingUser) && <div className="absolute bg-[#1c102b] opacity-50 inset-0 rounded-full overflow-hidden" />}
                                            <img
                                                src={userData?.avatar ? CORE_BACKEND_URL + (userData?.avatar ?? "") : DEFAULT_PROFILE_PICTURE}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute inset-0 border-4 border-[#00D1FF] rounded-full opacity-30 animate-pulse"></div>
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                            id="avatar-upload"
                                        />
                                        <Label
                                            htmlFor="avatar-upload"
                                            className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#FF005D] text-white rounded-lg hover:bg-[#FF005D]/80 transition-colors"
                                        >
                                            <Camera className="mr-2" size={16} />
                                            Change Avatar
                                        </Label>
                                        <p className="text-sm text-[#8a86a0] mt-2">JPG, PNG or GIF. Max size 5MB.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="bg-[#1c102b] border border-[#3f2e6a] border-opacity-70 rounded-xl p-6 space-y-6">
                            <div>
                                <div className="text-[#00D1FF] flex items-center">
                                    <User className="mr-2" size={20} />
                                    <h2 className="text-lg font-bold">Personal Information</h2>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Input
                                            type="text"
                                            label="Full Name"
                                            placeholder="Enter your full name"
                                            name="fullName"
                                            value={values.fullName}
                                            onChange={(e) => setFieldValue("fullName", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            type="email"
                                            label="Email Address"
                                            placeholder="Enter your email"
                                            name="email"
                                            value={values.email}
                                            onChange={(e) => setFieldValue("email", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <PhoneInput
                                            label="Phone Number"
                                            type="tel"
                                            name="phoneNumber"
                                            value={values.phoneNumber}
                                            onChange={(e) => setFieldValue("phoneNumber", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="location" className="text-[#ffff] flex items-center mb-2">
                                            <MapPin className="mr-1" size={16} />
                                            Location
                                        </Label>
                                        <div className="relative w-full ">
                                            <Field
                                                {...field}
                                                ref={locationInputRef}
                                                as={Input}
                                                id="location"
                                                name="location"
                                                placeholder="Enter your location"
                                            />
                                        </div>
                                        {/* <GoogleLocationInput name="location" label="Location" /> */}
                                        <ErrorMessage name="location" component="div" className="text-[#FF005D] text-sm mt-1" />
                                    </div>
                                </div>

                            </div>

                            <div>
                                <Input
                                    type="textarea"
                                    label="Bio"
                                    placeholder="Tell us about yourself..."
                                    name="bio"
                                    onChange={(e) => setFieldValue("bio", e.target.value)}
                                />
                                {/* <p className="text-sm text-[#8a86a0] mt-1">{values?.bio?.length || 0}/500 characters</p> */}
                            </div>
                        </div>

                        {/* Notification Settings */}
                        <div className="bg-[#1c102b] border border-[#3f2e6a] border-opacity-70 rounded-xl p-6 space-y-6">
                            <div>
                                <div className="text-[#00D1FF] flex items-center">
                                    <Bell className="mr-2" size={20} />
                                    <h2 className="text-lg font-bold">Notification Preferences</h2>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-white">Email Notifications</Label>
                                        <p className="text-sm text-[#8a86a0]">Receive notifications via email</p>
                                    </div>
                                    <Switch
                                        checked={values.notifications.email}
                                        onCheckedChange={(checked) => setFieldValue("notifications.email", checked)}
                                        className="self-end data-[state=unchecked]:bg-gray-700 data-[state=checked]:bg-green-700"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-white">Push Notifications</Label>
                                        <p className="text-sm text-[#8a86a0]">Receive push notifications in browser</p>
                                    </div>
                                    <Switch
                                        checked={values.notifications.push}
                                        onCheckedChange={(checked) => setFieldValue("notifications.push", checked)}
                                        className="self-end data-[state=unchecked]:bg-gray-700 data-[state=checked]:bg-green-700"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-white">SMS Notifications</Label>
                                        <p className="text-sm text-[#8a86a0]">Receive notifications via SMS</p>
                                    </div>
                                    <Switch
                                        checked={values.notifications.sms}
                                        onCheckedChange={(checked) => setFieldValue("notifications.sms", checked)}
                                        className="self-end data-[state=unchecked]:bg-gray-700 data-[state=checked]:bg-green-700"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-white">Marketing Communications</Label>
                                        <p className="text-sm text-[#8a86a0]">Receive updates about new features and events</p>
                                    </div>
                                    <Switch
                                        checked={values.notifications.marketing}
                                        onCheckedChange={(checked) => setFieldValue("notifications.marketing", checked)}
                                        className="self-end data-[state=unchecked]:bg-gray-700 data-[state=checked]:bg-green-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Privacy Settings */}
                        <div className="bg-[#1c102b] border border-[#3f2e6a] border-opacity-70 rounded-xl p-6 space-y-6">
                            <div>
                                <div className="text-[#00D1FF] flex items-center">
                                    <Shield className="mr-2" size={20} />
                                    Privacy Settings
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-white flex items-center">
                                            <Eye className="mr-2" size={16} />
                                            Public Profile
                                        </Label>
                                        <p className="text-sm text-[#8a86a0]">Make your profile visible to other users</p>
                                    </div>
                                    <Switch
                                        checked={values.privacy.profileVisible}
                                        onCheckedChange={(checked) => setFieldValue("privacy.profileVisible", checked)}
                                        className="self-end data-[state=unchecked]:bg-gray-700 data-[state=checked]:bg-green-700"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-white flex items-center">
                                            <Mail className="mr-2" size={16} />
                                            Show Email
                                        </Label>
                                        <p className="text-sm text-[#8a86a0]">Display email address on your profile</p>
                                    </div>
                                    <Switch
                                        checked={values.privacy.showEmail}
                                        onCheckedChange={(checked) => setFieldValue("privacy.showEmail", checked)}
                                        className="self-end data-[state=unchecked]:bg-gray-700 data-[state=checked]:bg-green-700"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label className="text-white flex items-center">
                                            <Phone className="mr-2" size={16} />
                                            Show Phone
                                        </Label>
                                        <p className="text-sm text-[#8a86a0]">Display phone number on your profile</p>
                                    </div>
                                    <Switch
                                        checked={values.privacy.showPhone}
                                        onCheckedChange={(checked) => setFieldValue("privacy.showPhone", checked)}
                                        className="self-end data-[state=unchecked]:bg-gray-700 data-[state=checked]:bg-green-700"
                                    />
                                </div>
                            </div>
                        </div>

                        <Drawer open={open} onOpenChange={setOpen}>
                            <DrawerContent
                                className="bg-[#1c102b] backdrop-transparent border-l border-[#3f2e6a] h-[100px] fixed bottom-0  w-full shadow-lg"
                                style={{ pointerEvents: 'auto' }}
                            >
                                <div className="flex justify-end space-x-4">
                                    <DrawerClose asChild>
                                        <GradientButton
                                            type="button"
                                            variant="outline"
                                            className="border border-[#3f2e6a] text-[#8a86a0] hover:bg-[#2a1f3d]"
                                        >
                                            Cancel
                                        </GradientButton>
                                    </DrawerClose>

                                    <GradientButton
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-[#00D1FF] text-black hover:bg-[#00D1FF]/80 flex items-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2" size={16} />
                                                Save Changes
                                            </>
                                        )}
                                    </GradientButton>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </Form>
                )}
            </Formik>
        </div >
    )
}
