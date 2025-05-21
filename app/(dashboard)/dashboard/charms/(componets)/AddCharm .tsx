'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Lock, Save } from 'lucide-react';

const AddCharm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [comments, setComments] = useState<string[]>(['']);
  const [captions, setCaptions] = useState<string[]>(['']);
  const [isPrivate, setIsPrivate] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const addComment = () => {
    setComments([...comments, '']);
  };

  const addCaption = () => {
    setCaptions([...captions, '']);
  };

  const removeComment = (index: number) => {
    const newComments = [...comments];
    newComments.splice(index, 1);
    setComments(newComments);
  };

  const removeCaption = (index: number) => {
    const newCaptions = [...captions];
    newCaptions.splice(index, 1);
    setCaptions(newCaptions);
  };

  const handleCommentChange = (index: number, value: string) => {
    const newComments = [...comments];
    newComments[index] = value;
    setComments(newComments);
  };

  const handleCaptionChange = (index: number, value: string) => {
    const newCaptions = [...captions];
    newCaptions[index] = value;
    setCaptions(newCaptions);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text font-orbitron mb-4">
          Add Your Charm
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
          Upload your charm and customize its details
        </p>
      </div>

      {/* Upload Section */}
      <div className="mb-8 md:mb-12">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${file ? 'border-gray-600 bg-gray-800/20' : 'border-gray-700 bg-gray-800/10 hover:bg-gray-800/20'}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {file ? (
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4 rounded-lg overflow-hidden border border-gray-700">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setFile(null)}
                  className="absolute top-1 right-1 bg-gray-900/80 rounded-full p-1 hover:bg-red-500/80 transition-colors"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
              <p className="text-gray-300 mb-2">{file.name}</p>
              <Badge variant="outline" className="bg-pink-500/20 text-pink-300">
                {file.type.split('/')[1].toUpperCase() || 'FILE'}
              </Badge>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                CLICK TO UPLOAD OR DRAG IT HERE
              </h3>
              <p className="text-sm text-gray-400 mb-4">SFC, MSC, MAY</p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                asChild
                variant="outline"
                className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600"
              >
                <label htmlFor="file-upload" className="cursor-pointer">
                  Select File
                </label>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Leader File Section */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold text-white font-orbitron mb-4 flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
            LEADER FILE
          </Badge>
        </h2>

        <div className="space-y-6">
          {/* Comments Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-3">Comments</h3>
            <div className="space-y-3">
              {comments.map((comment, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => handleCommentChange(index, e.target.value)}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    placeholder="Add a comment..."
                  />
                  {comments.length > 1 && (
                    <button
                      onClick={() => removeComment(index)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
              <Button
                variant="ghost"
                className="text-pink-400 hover:text-pink-300"
                onClick={addComment}
              >
                + Add Comment
              </Button>
            </div>
          </div>

          {/* Captions Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-3">Captions</h3>
            <div className="space-y-3">
              {captions.map((caption, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => handleCaptionChange(index, e.target.value)}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Add a caption..."
                  />
                  {captions.length > 1 && (
                    <button
                      onClick={() => removeCaption(index)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
              <Button
                variant="ghost"
                className="text-blue-400 hover:text-blue-300"
                onClick={addCaption}
              >
                + Add Caption
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 shadow-lg mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-gray-400" />
            <span className="text-gray-300">
              Only you or specific people can view this charm.
            </span>
          </div>
          <Button
            variant={isPrivate ? 'default' : 'outline'}
            className={`${isPrivate ? 'bg-pink-500 hover:bg-pink-600' : 'border-gray-600 text-gray-300'}`}
            onClick={() => setIsPrivate(!isPrivate)}
          >
            {isPrivate ? 'Private' : 'Make Private'}
          </Button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-orbitron text-lg rounded-lg shadow-lg px-8 py-6 transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-2">
          <Save className="h-5 w-5" />
          <span>SAVE CHARM</span>
        </Button>
      </div>
    </div>
  );
};

export default AddCharm;
