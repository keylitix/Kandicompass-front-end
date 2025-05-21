// import { useFormik } from 'formik';
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { ChangeEvent, DragEvent, useCallback, useState } from 'react';
// import {
//   useAddThreadMutation,
//   useGetAllThreadsQuery,
//   useUploadThreadImageMutation,
// } from '@/redux/api/thredApi';
// import Input from '../custom-ui/Input';
// import { GradientButton } from '../custom-ui/GradientButton';
// import { useAppSelector } from '@/app/hook/useReduxApp';
// import ImageUpload from '../custom-ui/ImageUpload';
// import CustomSelect from '../custom-ui/Select';
// import { CreateBeadRequest } from '@/app/types/bead';
// import { useAddBeadMutation } from '@/redux/api/beadApi';

// interface UploadedFile {
//   file: File;
//   previewUrl: string;
// }

// interface AddThreadProps {
//   isOpen: boolean;
//   onClose: () => void;
//   refetchBeads?: () => void;
//   isFetchingBeads?: boolean;
//   threadId?: string;
// }

// const shapeOptions = [
//   'Round',
//   'Oval',
//   'Cube',
//   'Cylinder',
//   'Heart',
//   'Star',
//   'Bicone',
//   'Drop',
//   'Petal',
//   'Donut',
// ];
// const finishOptions = [
//   'Matte',
//   'Glossy',
//   'Metallic',
//   'Pearl',
//   'Transparent',
//   'Opaque',
//   'Iridescent',
// ];
// const unitOptions = ['pieces', 'grams', 'ounces', 'pounds', 'kilograms'];
// const materialOptions = [
//   'Metal',
//   'Wood',
//   'Acrylic',
//   'Resin',
//   'Ceramic',
//   'Stone',
//   'Glass',
//   'Plastic',
// ];

// const AddBead: React.FC<AddThreadProps> = ({
//   isOpen,
//   onClose,
//   refetchBeads,
//   isFetchingBeads,
//   threadId,
// }) => {
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile | null>(null);

//   const [addBead, { isLoading: isAdding }] = useAddBeadMutation();
//   const [uploadImage, { isLoading: isUploading }] =
//     useUploadThreadImageMutation();

//   const { user } = useAppSelector((state) => state.auth);

//   const formik = useFormik<CreateBeadRequest>({
//     initialValues: {
//       beadName: '',
//       threadId: threadId ?? '',
//       ownerId: user?.id ?? '',
//       visibility: 'Public',
//       beadType: '',
//       material: '',
//       color: '',
//       size: 0,
//       shape: '',
//       weight: 0,
//       finish: '',
//       productCode: '',
//       description: '',
//       quantity: 0,
//       supplier: '',
//       pricePerUnit: 0,
//     },
//     enableReinitialize: true,
//     onSubmit: async (values: CreateBeadRequest) => {
//       console.log(values);
//       debugger;
//       const res = await addBead(values).unwrap();
//       if (res && res?.isSuccess) {
//         setUploadedFile(null);
//         refetchBeads && refetchBeads();
//         if (!isAdding || !isFetchingBeads) {
//           onClose();
//           formik.resetForm();
//         }
//       }
//     },
//   });

//   // const handleFileChange = useCallback((files: File[]) => {
//   //   if (files && files.length > 0) {
//   //     const newFiles = Array.from(files).map((file) => ({
//   //       file,
//   //       previewUrl: URL.createObjectURL(file),
//   //     }));
//   //     setUploadedFile((prev) => [...prev, ...newFiles]);
//   //   }
//   // }, []);

//   // const handleSaveThread = async (values: any) => {
//   //   try {
//   //     const { threadName, description, location, isPrivate } = values;
//   //     const threadPayload = {
//   //       threadName,
//   //       description,
//   //       charmLocation: location,
//   //     };

//   //     const threadRes = await addThread(threadPayload).unwrap();
//   //     console.log("Thread created:", threadRes);

//   //     for (const uploaded of uploadedFile) {
//   //       const formData = new FormData();
//   //       formData.append("image", uploaded.file);

//   //       const uploadRes = await uploadImage({
//   //         threadId: threadRes.threadId,
//   //         formData,
//   //       }).unwrap();

//   //       console.log("Image uploaded:", uploadRes);
//   //     }

//   //     alert("Thread created and images uploaded successfully!");
//   //   } catch (error) {
//   //     console.error("Error saving thread:", error);
//   //     alert("Something went wrong while saving the thread.");
//   //   }
//   // };
//   return (
//     <div>
//       <Dialog open={isOpen} onOpenChange={onClose}>
//         <DialogContent className="min-w-[80vw]">
//           <DialogHeader>
//             <DialogTitle>
//               <h2 className="text-3xl font-bold">Create a Bead</h2>
//             </DialogTitle>
//           </DialogHeader>

//           <form onSubmit={formik.handleSubmit}>
//             <Input
//               label="Title"
//               type="text"
//               placeholder="Enter bead title"
//               value={formik.values.beadName}
//               onChange={formik.handleChange}
//               name="beadName"
//             />

//             <Input
//               label="Description"
//               type="textarea"
//               placeholder="Enter bead description"
//               value={formik.values.description}
//               onChange={formik.handleChange}
//               name="description"
//             />

//             <div className="flex flex-col gap-2">
//               <div>
//                 <h3 className="text-xl font-bold">Inventory Information</h3>
//               </div>
//               <div className="grid grid-cols-2 gap-x-8">
//                 <Input
//                   label="Bead Type"
//                   type="text"
//                   placeholder="Enter bead type"
//                   value={formik.values.beadType}
//                   onChange={formik.handleChange}
//                   name="beadType"
//                 />

//                 <CustomSelect
//                   label="Material"
//                   name="material"
//                   placeholder="Select bead material"
//                   value={formik.values.material}
//                   onChange={formik.handleChange}
//                   options={materialOptions.map((material) => ({
//                     value: material,
//                     label: material,
//                   }))}
//                 />

//                 <Input
//                   label="Color"
//                   type="text"
//                   placeholder="Enter bead color"
//                   value={formik.values.color}
//                   onChange={formik.handleChange}
//                   name="color"
//                 />

//                 <Input
//                   label="Size"
//                   type="number"
//                   placeholder="Enter bead size"
//                   value={formik.values.size}
//                   onChange={formik.handleChange}
//                   name="size"
//                 />

//                 <CustomSelect
//                   label="Shape"
//                   name="shape"
//                   placeholder="Select bead shape"
//                   value={formik.values.shape}
//                   onChange={formik.handleChange}
//                   options={shapeOptions.map((shape) => ({
//                     value: shape,
//                     label: shape,
//                   }))}
//                 />

//                 <Input
//                   label="Weight"
//                   type="number"
//                   placeholder="Enter bead weight"
//                   value={formik.values.weight}
//                   onChange={formik.handleChange}
//                   name="weight"
//                 />

//                 <CustomSelect
//                   label="Finish"
//                   name="finish"
//                   placeholder="Select bead finish"
//                   value={formik.values.finish}
//                   onChange={formik.handleChange}
//                   options={finishOptions.map((finish) => ({
//                     value: finish,
//                     label: finish,
//                   }))}
//                 />

//                 <Input
//                   label="Product Code"
//                   type="text"
//                   placeholder="Enter product code"
//                   value={formik.values.productCode}
//                   onChange={formik.handleChange}
//                   name="productCode"
//                 />
//               </div>
//             </div>

//             <ImageUpload
//               label="Upload thread Images"
//               onChange={() => {}}
//               acceptedFormats="image/jpeg, image/png"
//               multiple={true}
//             />
//             <div className="mt-6">
//               <h3 className="text-white">Selected Files:</h3>
//               <ul className="text-white">
//                 <ul className="text-white">
//                   {/* {uploadedFile.map((uploaded, index) => (
//                     <li key={index}>{uploaded.file.name}</li>
//                   ))} */}
//                 </ul>
//               </ul>
//             </div>

//             <div className="mt-6 flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 className="accent-[#FF005D]"
//                 checked={formik.values.visibility === 'Private'}
//                 onChange={(e) => {
//                   formik.setFieldValue(
//                     'visibility',
//                     e.target.checked ? 'Private' : 'Public',
//                   );
//                 }}
//                 name="isPrivate"
//               />
//               <label className="text-white text-sm">
//                 Only you or specific people can view this bead.
//               </label>
//             </div>

//             <DialogFooter className="mt-6">
//               <GradientButton variant="outline" onClick={onClose} type="button">
//                 Close
//               </GradientButton>
//               <GradientButton
//                 type="submit"
//                 disabled={isAdding || isUploading || isFetchingBeads}
//               >
//                 {isAdding || isUploading || isFetchingBeads
//                   ? 'Saving...'
//                   : 'Save Bead'}
//               </GradientButton>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AddBead;

import { useFormik } from 'formik';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { GradientButton } from '../custom-ui/GradientButton';
import { useAppSelector } from '@/app/hook/useReduxApp';
import ImageUpload from '../custom-ui/ImageUpload';
import CustomSelect from '../custom-ui/Select';
import { CreateBeadRequest } from '@/app/types/bead';
import {
  useAddBeadMutation,
  useDeleteBeadMutation,
  useUploadBeadImageMutation,
} from '@/redux/api/beadApi';
import Input from '../custom-ui/Input';

interface UploadedFile {
  file: File;
  previewUrl: string;
}

interface AddThreadProps {
  isOpen: boolean;
  onClose: () => void;
  refetchBeads?: () => void;
  isFetchingBeads?: boolean;
  threadId?: string;
}

const shapeOptions = [
  'Round',
  'Oval',
  'Cube',
  'Cylinder',
  'Heart',
  'Star',
  'Bicone',
  'Drop',
  'Petal',
  'Donut',
];
const finishOptions = [
  'Matte',
  'Glossy',
  'Metallic',
  'Pearl',
  'Transparent',
  'Opaque',
  'Iridescent',
];
const unitOptions = ['pieces', 'grams', 'ounces', 'pounds', 'kilograms'];
const materialOptions = [
  'Metal',
  'Wood',
  'Acrylic',
  'Resin',
  'Ceramic',
  'Stone',
  'Glass',
  'Plastic',
];

const AddBead: React.FC<AddThreadProps> = ({
  isOpen,
  onClose,
  refetchBeads,
  isFetchingBeads,
  threadId,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  const [addBead, { isLoading: isAdding }] = useAddBeadMutation();
  const [deleteBead] = useDeleteBeadMutation();
  const [uploadBeadImage] = useUploadBeadImageMutation();

  const { user } = useAppSelector((state) => state.auth);

  const formik = useFormik<CreateBeadRequest>({
    initialValues: {
      beadName: '',
      threadId: threadId ?? '',
      ownerId: user?.id ?? '',
      visibility: 'Public',
      beadType: '',
      material: '',
      color: '',
      size: 0,
      shape: '',
      weight: 0,
      finish: '',
      productCode: '',
      description: '',
      quantity: 0,
      supplier: '',
      pricePerUnit: 0,
    },
    enableReinitialize: true,
    onSubmit: async (values: CreateBeadRequest) => {
      try {
        // First create the bead
        const beadResponse = await addBead(values).unwrap();

        console.log('beadResponse========', beadResponse);
        debugger;
        if (!beadResponse?.isSuccess || !beadResponse.data?._id) {
          throw new Error('Failed to create bead');
        }

        const beadId = beadResponse.data._id;

        // If there are images to upload
        if (uploadedFiles.length > 0) {
          setIsUploadingImages(true);

          const formData = new FormData();
          uploadedFiles.forEach((fileObj) => {
            formData.append('files', fileObj.file);
          });

          // Upload images
          const uploadResponse = await uploadBeadImage({
            beadId,
            formData,
          }).unwrap();

          if (!uploadResponse?.isSuccess) {
            // If image upload fails, delete the bead we just created
            await deleteBead(beadId);
            throw new Error('Failed to upload images');
          }
        }

        // Success - close dialog and reset form
        setUploadedFiles([]);
        refetchBeads?.();
        onClose();
        formik.resetForm();
      } catch (error) {
        console.error('Error creating bead:', error);
        // Handle error (show toast, etc.)
      } finally {
        setIsUploadingImages(false);
      }
    },
  });

  console.log('jljdljlfjdljlfm', uploadedFiles);

  const handleFileChange = (files: File[]) => {
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].previewUrl); // Clean up memory
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-[80vw]">
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-3xl font-bold">Create a Bead</h2>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit}>
            <Input
              label="Title"
              type="text"
              placeholder="Enter bead title"
              value={formik.values.beadName}
              onChange={formik.handleChange}
              name="beadName"
            />

            <Input
              label="Description"
              type="textarea"
              placeholder="Enter bead description"
              value={formik.values.description}
              onChange={formik.handleChange}
              name="description"
            />

            <div className="flex flex-col gap-2">
              <div>
                <h3 className="text-xl font-bold">Inventory Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-x-8">
                <Input
                  label="Bead Type"
                  type="text"
                  placeholder="Enter bead type"
                  value={formik.values.beadType}
                  onChange={formik.handleChange}
                  name="beadType"
                />

                <CustomSelect
                  label="Material"
                  name="material"
                  placeholder="Select bead material"
                  value={formik.values.material}
                  onChange={formik.handleChange}
                  options={materialOptions.map((material) => ({
                    value: material,
                    label: material,
                  }))}
                />

                <Input
                  label="Color"
                  type="text"
                  placeholder="Enter bead color"
                  value={formik.values.color}
                  onChange={formik.handleChange}
                  name="color"
                />

                <Input
                  label="Size"
                  type="number"
                  placeholder="Enter bead size"
                  value={formik.values.size}
                  onChange={formik.handleChange}
                  name="size"
                />

                <CustomSelect
                  label="Shape"
                  name="shape"
                  placeholder="Select bead shape"
                  value={formik.values.shape}
                  onChange={formik.handleChange}
                  options={shapeOptions.map((shape) => ({
                    value: shape,
                    label: shape,
                  }))}
                />

                <Input
                  label="Weight"
                  type="number"
                  placeholder="Enter bead weight"
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  name="weight"
                />

                <CustomSelect
                  label="Finish"
                  name="finish"
                  placeholder="Select bead finish"
                  value={formik.values.finish}
                  onChange={formik.handleChange}
                  options={finishOptions.map((finish) => ({
                    value: finish,
                    label: finish,
                  }))}
                />

                <Input
                  label="Product Code"
                  type="text"
                  placeholder="Enter product code"
                  value={formik.values.productCode}
                  onChange={formik.handleChange}
                  name="productCode"
                />
              </div>
            </div>

            <ImageUpload
              label="Upload Bead Images"
              onChange={handleFileChange}
              // onRemove={handleRemoveFile}
              acceptedFormats="image/jpeg, image/png"
              multiple={true}
            />

            <div className="mt-4">
              <h3 className="text-white mb-2">Selected Files:</h3>
              <ul className="text-white space-y-2">
                {uploadedFiles.map((uploaded, index) => (
                  <li key={index} className="flex items-center">
                    <span>{uploaded.file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="ml-2 text-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </li>
                ))}
                {uploadedFiles.length === 0 && (
                  <li className="text-gray-400">No files selected</li>
                )}
              </ul>
            </div>

            <div className="mt-6 flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-[#FF005D]"
                checked={formik.values.visibility === 'Private'}
                onChange={(e) => {
                  formik.setFieldValue(
                    'visibility',
                    e.target.checked ? 'Private' : 'Public',
                  );
                }}
                name="isPrivate"
              />
              <label className="text-white text-sm">
                Only you or specific people can view this bead.
              </label>
            </div>

            <DialogFooter className="mt-6">
              <GradientButton variant="outline" onClick={onClose} type="button">
                Close
              </GradientButton>
              <GradientButton
                type="submit"
                disabled={isAdding || isUploadingImages || isFetchingBeads}
              >
                {isAdding || isUploadingImages || isFetchingBeads
                  ? 'Saving...'
                  : 'Save Bead'}
              </GradientButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBead;
