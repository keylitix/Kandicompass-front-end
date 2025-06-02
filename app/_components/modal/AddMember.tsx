import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { GradientButton } from '../custom-ui/GradientButton';
import Input from '../custom-ui/Input';
import { useGetAllUsersQuery } from '@/redux/api/userApi';
import { Search, X } from 'lucide-react';
import { User } from '@/app/types/UserType';
import { useSendInvitationMutation } from '@/redux/api/thredApi';
import { sendInvitationRequest, SendInvitationResponse } from '@/app/types/threads';
import { toast } from 'sonner';

interface AddMembersProps {
  isOpen: boolean;
  onClose: () => void;
  threadId: string;
}

const AddMembers: React.FC<AddMembersProps> = ({ isOpen, onClose, threadId }) => {
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();
  const [sendInvitation, { isLoading: invitationLoading }
  ] = useSendInvitationMutation();

  const [search, setSearch] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [selected, setSelected] = useState<string>('');

  const users = usersData?.data ?? [];

  const toggleSelect = (email: string) => {
    setSelected(email);
  };

  useEffect(() => {
    if (!users) return;
    if (search.trim() !== "") {
      const filtered = users.filter((u) =>
        u?.email?.toLowerCase().includes(search.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [search, users]);

  const onInvitationSend = async () => {
    const payload = {
      email: selected,
      threadId: threadId,
    }
    if (!selected || !threadId) return;
    const res = await sendInvitation(payload);
    const {isSuccess} = res?.data as SendInvitationResponse;
    if(isSuccess) {
      toast.success('Invitation sent successfully!');
      onClose();
    } else {
      toast.error('Failed to send invitation. Try again.');
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent">
                Add Members
              </h2>
            </DialogTitle>
          </DialogHeader>

          {usersLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Input
                icon={Search}
                label=""
                type="text"
                placeholder="Search by email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="space-y-2 max-h-64 overflow-y-auto mt-4">
                {search.trim() === "" ? (
                  <p className="text-gray-400 text-sm">Start typing to search users by email...</p>
                ) : results.length > 0 ? (
                  results.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center gap-2 border p-2 rounded-md"
                    >
                      <input
                        type="checkbox"
                        checked={selected.includes(user?.email)}
                        onChange={() => toggleSelect(user.email)}
                      />
                      <span>{user.email}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No users found.</p>
                )}

              </div>

              {selected.length > 0 && (
                <div className="my-4">
                  <h4 className="font-semibold">Selected Emails:</h4>
                  <ul className="list-disc pl-5">
                    <div className="flex flex-wrap gap-2 mt-2">
                      {/* {selected.map((email) => (
                        <span
                          key={email}
                          className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-white bg-transparent"
                          style={{
                            borderImage:
                              'linear-gradient(to right, #FF005D, #00D1FF) 1',
                            borderStyle: 'solid',
                            borderWidth: '1px',
                          }}
                        >
                          {email}
                          <button
                            className="ml-2 text-white hover:text-red-500 transition cursor-pointer"
                            onClick={() =>
                              setSelected((prev) =>
                                prev.filter((e) => e !== email),
                              )
                            }
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))} */}
                        <span
                          className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-white bg-transparent"
                          style={{
                            borderImage:
                              'linear-gradient(to right, #FF005D, #00D1FF) 1',
                            borderStyle: 'solid',
                            borderWidth: '1px',
                          }}
                        >
                          {selected}
                          <button
                            className="ml-2 text-white hover:text-red-500 transition cursor-pointer"
                            onClick={() =>
                              setSelected(selected)
                            }>
                            <X size={14} />
                          </button>
                        </span>
                    </div>
                  </ul>
                </div>
              )}
            </>
          )}

          <DialogFooter>
            <GradientButton variant="outline" onClick={onClose}>
              Cancel
            </GradientButton>
            <GradientButton onClick={onInvitationSend}>
              {invitationLoading ? 'Sending...' : 'Send Invitation'}
            </GradientButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMembers;
