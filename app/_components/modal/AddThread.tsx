import { useFormik } from "formik";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChangeEvent, DragEvent, useCallback, useState } from 'react';
import { useAddThreadMutation, useUploadThreadImageMutation } from '@/redux/api/thredApi';
import Input from '../custom-ui/Input';
import { GradientButton } from '../custom-ui/GradientButton';
import { Thread } from "@/app/types/common";

interface UploadedFile {
  file: File;
  previewUrl: string;
}

interface AddThreadProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddThread: React.FC<AddThreadProps> = ({ isOpen, onClose }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const formik = useFormik<Thread>({
    initialValues: {
      threadName: "",
      description: "",
      isPrivate: true,
    },
    onSubmit: async (values: Thread) => {
      handleSaveThread(values);
    },
  });

  const [addThread] = useAddThreadMutation();
  const [uploadImage] = useUploadThreadImageMutation();

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleRemoveFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    URL.revokeObjectURL(newFiles[index].previewUrl);
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const handleSaveThread = async (values: any) => {
    try {
      const { threadName, description, location, isPrivate } = values;
      const threadPayload = {
        threadName,
        description,
        charmLocation: location,
      };

      const threadRes = await addThread(threadPayload).unwrap();
      console.log("Thread created:", threadRes);

      for (const uploaded of uploadedFiles) {
        const formData = new FormData();
        formData.append("image", uploaded.file);

        const uploadRes = await uploadImage({
          threadId: threadRes.threadId,
          formData,
        }).unwrap();

        console.log("Image uploaded:", uploadRes);
      }

      alert("Thread created and images uploaded successfully!");
    } catch (error) {
      console.error("Error saving thread:", error);
      alert("Something went wrong while saving the thread.");
    }
  };

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
              placeholder="Enter your thread title"
              value={formik.values.threadName}
              onChange={formik.handleChange}
              name="threadName"
            />

            <Input
              label="Description"
              type="textarea"
              placeholder="Enter your thread description"
              value={formik.values.description}
              onChange={formik.handleChange}
              name="description"
            />

            <div className="mt-6 flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-[#FF005D]"
                checked={formik.values.isPrivate}
                onChange={formik.handleChange}
                name="isPrivate"
              />
              <label className="text-white text-sm">
                Only you or specific people can view this thread.
              </label>
            </div>


            <DialogFooter className="mt-6">
              <GradientButton type="submit">
                Save
              </GradientButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddThread;
