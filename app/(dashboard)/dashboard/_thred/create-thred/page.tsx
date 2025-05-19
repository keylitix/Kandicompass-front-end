"use client";
import React, { useState, useCallback, ChangeEvent, DragEvent } from "react";
import downloadImge from "@/public/download.svg";
import Image from "next/image";
import { useAddThreadMutation, useUploadThreadImageMutation } from "@/redux/api/thredApi";

interface UploadedFile {
    file: File;
    previewUrl: string;
}

const DCharmUpload = () => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [threadName, setThreadName] = useState<string>("NZ");
    const [threadId, setThreadId] = useState<string>("R4025");
    const [location, setLocation] = useState<string>("R4025");
    const [isPrivate, setIsPrivate] = useState<boolean>(true);

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

    const handleSaveThread = async () => {
        try {
            const threadPayload = {
                threadName,
                threadId,
                charmLocation: location,
            };

            const threadRes = await addThread(threadPayload).unwrap();
            console.log("Thread created:", threadRes.data._doc._id);

            if (threadRes.data._doc._id) {
                for (const uploaded of uploadedFiles) {
                    const formData = new FormData();
                    formData.append("file", uploaded.file);

                    const uploadRes = await uploadImage({
                        threadId: threadRes.data._doc._id,
                        formData: formData,
                    }).unwrap();

                    console.log("Image uploaded:", uploadRes);
                }

                alert("Thread created and images uploaded successfully!");

            }
        } catch (error) {
            console.error("Error saving thread:", error);
            alert("Something went wrong while saving the thread.");
        }
    };

    const chunkedFiles = [];
    for (let i = 0; i < uploadedFiles.length; i += 4) {
        chunkedFiles.push(uploadedFiles.slice(i, i + 4));
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 bg-[#170F24]">
            <div className="mt-10 w-full max-w-[700px]">
                <h1
                    className="text-center mb-8"
                    style={{
                        fontFamily: "Orbitron",
                        fontWeight: 700,
                        fontSize: "46px",
                        lineHeight: "52px",
                        background: "linear-gradient(90.24deg, #FF005D 50.79%, #00D1FF 81.07%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Create Thread
                </h1>

                <div className="mb-6">
                    <label className="block text-white mb-2">Thread Name</label>
                    <input
                        type="text"
                        value={threadName}
                        onChange={(e) => setThreadName(e.target.value)}
                        className="w-full p-3 text-white bg-transparent border-2 border-transparent"
                        style={{
                            borderImage: "linear-gradient(to right, #FF005D, #00D1FF) 1",
                            outline: "none",
                        }}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-white mb-2">Thread ID</label>
                    <input
                        type="text"
                        value={threadId}
                        readOnly
                        className="w-full p-3 text-white border-2 border-transparent bg-[#170F24]"
                        style={{
                            borderImage: "linear-gradient(to right, #FF005D, #00D1FF) 1",
                            outline: "none",
                        }}
                    />
                </div>

                <div className="mb-6">
                    <p className="text-white mb-2">Add Your Kendi Charm Image</p>
                    <div
                        className="border-2 border-transparent bg-[#170F24] text-white text-center min-h-[325px] w-full flex flex-col justify-center items-center gap-4 p-4"
                        style={{
                            borderImage: "linear-gradient(to right, #FF005D, #00D1FF) 1",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                        }}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {uploadedFiles.length > 0 ? (
                            <div className="w-full">
                                {chunkedFiles.map((row, rowIndex) => (
                                    <div key={rowIndex} className="flex justify-center gap-4 mb-4">
                                        {row.map((file, fileIndex) => {
                                            const index = rowIndex * 4 + fileIndex;
                                            return (
                                                <div key={index} className="relative w-1/4 aspect-square">
                                                    <Image
                                                        src={file.previewUrl}
                                                        alt={`Uploaded preview ${index + 1}`}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="rounded-md"
                                                    />
                                                    <button
                                                        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white p-1 rounded-full text-xs"
                                                        onClick={() => handleRemoveFile(index)}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <Image src={downloadImge} alt="Upload Icon" className="w-[60px] mb-2 ml-[80px]" />
                                    <p className="text-sm text-white">
                                        <span className="text-[#FF005D]">CLICK TO DISC/HIS_OR.DRAW.IF HERE</span>
                                        <br />
                                        <span className="text-gray-400">FOR THIS PINK</span>
                                        <br />
                                        <span className="text-gray-400">LIKABOILS</span>
                                    </p>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        accept=".jpg,.jpeg,.png,.svg"
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-white mb-2">Set Your Charm’s Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-3 text-white bg-transparent border-2 border-transparent"
                        style={{
                            borderImage: "linear-gradient(to right, #FF005D, #00D1FF) 1",
                            outline: "none",
                        }}
                    />
                </div>

                <div className="mt-6 flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="accent-[#FF005D]"
                        checked={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.checked)}
                    />
                    <label className="text-white text-sm">
                        Only you or specific people can view this thread.
                    </label>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        className="px-8 py-3 bg-gradient-to-r from-[#FF005D] to-[#00D1FF] text-white font-semibold rounded-md shadow-md hover:opacity-90 transition"
                        onClick={handleSaveThread}
                        disabled={uploadedFiles.length === 0}
                    >
                        SAVE THREAD
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DCharmUpload;
