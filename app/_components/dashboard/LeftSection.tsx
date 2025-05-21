'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { Globe, Heart, MessageSquareText, Send } from 'lucide-react';

import avatar from '@/public/User.svg';
import threadURL from '@/public/thred.svg';
import Link from 'next/link';

const LeftSection = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<
    { id: number; text: string; liked: boolean }[]
  >([]);
  const [newComment, setNewComment] = useState('');
  const commentBoxRef = useRef<HTMLDivElement>(null);

  const toggleLike = () => setIsLiked((prev) => !prev);

  const toggleComments = () => {
    setShowComments((prev) => !prev);
    setTimeout(() => {
      commentBoxRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      { id: Date.now(), text: newComment.trim(), liked: false },
    ]);
    setNewComment('');
  };

  const toggleCommentLike = (commentId: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, liked: !comment.liked }
          : comment,
      ),
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Thread Charm</h2>

      <div className="bg-[#1c102b] p-4 rounded-md border border-[#3f2e6a] text-white">
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={avatar}
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-bold">Sofiaa</p>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              5h <Globe size={12} />
            </div>
          </div>
        </div>

        <p className="text-sm mb-4 text-gray-200">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at amet
          lacinia elit. Nulla at amet vel leo feugiat vehicula.
        </p>

        <div className="w-full h-80 relative mb-4   rounded-md">
          <Link href={`/dashboard/charms`}>
            <Image
              src={threadURL}
              alt="Thread Charm"
              fill
              className="object-contain p-4"
            />
          </Link>
        </div>

        <div className="flex justify-around text-center border-t border-[#2c1a45] pt-4 text-sm">
          <button
            className="hover:text-pink-500 flex flex-col items-center"
            onClick={toggleLike}
          >
            {isLiked ? (
              <Heart fill="red" color="red" className="mb-1" />
            ) : (
              <Heart className="mb-1" />
            )}
            Like
          </button>
          <button
            className="hover:text-blue-400 flex flex-col items-center"
            onClick={toggleComments}
          >
            <MessageSquareText className="mb-1 scale-x-[-1]" />
            Comment
          </button>
          <button className="hover:text-green-400 flex flex-col items-center">
            <Send className="mb-1" />
            Share
          </button>
        </div>

        {showComments && (
          <div
            ref={commentBoxRef}
            className="mt-4 bg-white/10 p-4 rounded-md space-y-4"
          >
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scroll">
              {comments.length === 0 ? (
                <p className="text-sm italic text-white/70 text-center py-4">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex justify-between items-start text-sm bg-white/5 p-3 rounded-md"
                  >
                    <p>{comment.text}</p>
                    <Heart
                      size={16}
                      color={comment.liked ? 'red' : 'white'}
                      fill={comment.liked ? 'red' : 'none'}
                      onClick={() => toggleCommentLike(comment.id)}
                      className="cursor-pointer mt-1 transition-transform hover:scale-125"
                    />
                  </div>
                ))
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addComment();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSection;
