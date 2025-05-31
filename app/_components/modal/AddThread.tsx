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

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
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
