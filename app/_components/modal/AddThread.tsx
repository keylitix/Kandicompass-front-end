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
  useUpdateThreadMutation,
  useUploadThreadImageMutation,
} from '@/redux/api/thredApi';
import Input from '../custom-ui/Input';
import { GradientButton } from '../custom-ui/GradientButton';
import { Thread, ThreadCreate } from '@/app/types/common';
import { useAppSelector } from '@/app/hook/useReduxApp';
import ImageUpload from '../custom-ui/ImageUpload';
import { ThreadUpdateRequest } from '@/app/types/threads';

interface UploadedFile {
  file: File;
  previewUrl: string;
}

interface AddThreadProps {
  isOpen: boolean;
  onClose: () => void;
  refetchThreads?: () => void;
  isFetchingThreads?: boolean;
  editData?: ThreadUpdateRequest;
}

const AddThread: React.FC<AddThreadProps> = ({
  isOpen,
  onClose,
  refetchThreads,
  isFetchingThreads,
  editData,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [addThread, { isLoading: isAdding }] = useAddThreadMutation();
  const [uploadImage, { isLoading: isUploading }] =
    useUploadThreadImageMutation();

  const isUpdateFrom = Boolean(editData && editData._id);
  const [updateThread, { isLoading: isUpdating }] = useUpdateThreadMutation();

  const formik = useFormik({
    initialValues: {
      threadName: editData?.threadName || '',
      description: editData?.description || '',
      ownerId: user?.id ?? '',
      visibility: editData?.visibility || 'Public',
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (isUpdateFrom && editData?._id && values) {
        const res = await updateThread({
          id: editData._id,
          payload: values,
        }).unwrap();
        if (res && res?.isSuccess) {
          setUploadedFile(null);
          refetchThreads && refetchThreads();
          if (!isUpdating || !isFetchingThreads) {
            onClose();
            formik.resetForm();
          }
        }
      } else {
        const res = await addThread(values).unwrap();
        if (res && res?.isSuccess) {
          setUploadedFile(null);
          refetchThreads && refetchThreads();
          if (!isAdding || !isFetchingThreads) {
            onClose();
            formik.resetForm();
          }
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
                {isUpdateFrom ? 'Update Thread' : 'Create a Thread'}
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
                  : isUpdateFrom
                    ? 'Update Thread'
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
