import { useFormik } from 'formik';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChangeEvent, DragEvent, useCallback, useState } from 'react';
import {
  useAddThreadMutation,
  useGetAllThreadsQuery,
  useUploadThreadImageMutation,
} from '@/redux/api/thredApi';
import Input from '../custom-ui/Input';
import { GradientButton } from '../custom-ui/GradientButton';
import { Thread, ThreadCreate } from '@/app/types/common';
import { useAppSelector } from '@/app/hook/useReduxApp';
import ImageUpload from '../custom-ui/ImageUpload';

interface UploadedFile {
  file: File;
  previewUrl: string;
}

interface AddThreadProps {
  isOpen: boolean;
  onClose: () => void;
  refetchThreads?: () => void;
  isFetchingThreads?: boolean;
}

const AddThread: React.FC<AddThreadProps> = ({
  isOpen,
  onClose,
  refetchThreads,
  isFetchingThreads,
}) => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const [addThread, { isLoading: isAdding }] = useAddThreadMutation();
  const [uploadImage, { isLoading: isUploading }] =
    useUploadThreadImageMutation();

  const { user } = useAppSelector((state) => state.auth);

  const formik = useFormik<ThreadCreate>({
    initialValues: {
      threadName: '',
      description: '',
      ownerId: user?.id ?? '',
      visibility: 'Public',
    },
    enableReinitialize: true,
    onSubmit: async (values: ThreadCreate) => {
      const res = await addThread(values).unwrap();
      if (res && res?.isSuccess) {
        setUploadedFile(null);
        refetchThreads && refetchThreads();
        if (!isAdding || !isFetchingThreads) {
          onClose();
          formik.resetForm();
        }
      }
    },
  });

  // const handleFileChange = useCallback((files: File[]) => {
  //   if (files && files.length > 0) {
  //     const newFiles = Array.from(files).map((file) => ({
  //       file,
  //       previewUrl: URL.createObjectURL(file),
  //     }));
  //     setUploadedFile((prev) => [...prev, ...newFiles]);
  //   }
  // }, []);

  // const handleSaveThread = async (values: any) => {
  //   try {
  //     const { threadName, description, location, isPrivate } = values;
  //     const threadPayload = {
  //       threadName,
  //       description,
  //       charmLocation: location,
  //     };

  //     const threadRes = await addThread(threadPayload).unwrap();
  //     console.log("Thread created:", threadRes);

  //     for (const uploaded of uploadedFile) {
  //       const formData = new FormData();
  //       formData.append("image", uploaded.file);

  //       const uploadRes = await uploadImage({
  //         threadId: threadRes.threadId,
  //         formData,
  //       }).unwrap();

  //       console.log("Image uploaded:", uploadRes);
  //     }

  //     alert("Thread created and images uploaded successfully!");
  //   } catch (error) {
  //     console.error("Error saving thread:", error);
  //     alert("Something went wrong while saving the thread.");
  //   }
  // };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent">
                Create a Thread
              </h2>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit}>
            <Input
              label="Title"
              type="text"
              placeholder="Enter thread title"
              value={formik.values.threadName}
              onChange={formik.handleChange}
              name="threadName"
            />

            <Input
              label="Description"
              type="textarea"
              placeholder="Enter thread description"
              value={formik.values.description}
              onChange={formik.handleChange}
              name="description"
            />

            {/* <ImageUpload
              label="Upload thread Images"
              onChange={handleFileChange}
              acceptedFormats="image/jpeg, image/png"
              multiple={true}
            />
            <div className="mt-6">
              <h3 className="text-white">Selected Files:</h3>
              <ul className="text-white">
                <ul className="text-white">
                  {uploadedFile.map((uploaded, index) => (
                    <li key={index}>{uploaded.file.name}</li>
                  ))}
                </ul>
              </ul>
            </div> */}

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
                Only you or specific people can view this thread.
              </label>
            </div>

            <DialogFooter className="mt-6">
              <GradientButton variant="outline" onClick={onClose} type="button">
                Close
              </GradientButton>
              <GradientButton
                type="submit"
                disabled={isAdding || isUploading || isFetchingThreads}
              >
                {isAdding || isUploading || isFetchingThreads
                  ? 'Saving...'
                  : 'Save Thread'}
              </GradientButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddThread;
function handleSaveThread(values: ThreadCreate) {
  throw new Error('Function not implemented.');
}
