import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { AVATAR_PRESETS } from '../../data/mockData';

interface EditProfileModalProps {
  profile: UserProfile;
  onClose: () => void;
  onSave: (updatedProfile: UserProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  onClose,
  onSave,
}) => {
  const [avatar, setAvatar] = useState(profile.avatar);
  const [nickname, setNickname] = useState(profile.nickname);
  const [username, setUsername] = useState(profile.username);
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [city, setCity] = useState(profile.city);
  const [bio, setBio] = useState(profile.bio);
  const [role, setRole] = useState(profile.role);
  const [error, setError] = useState('');

  const handleCustomPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setError('Image must be under 3MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError('Please provide a nickname');
      return;
    }
    if (!username.trim()) {
      setError('Please provide a username');
      return;
    }

    const cleanUsername = username.trim().replace(/^@+/, '').toLowerCase();

    const updated: UserProfile = {
      ...profile,
      avatar,
      nickname: nickname.trim(),
      username: cleanUsername,
      fullName: fullName.trim() || nickname.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      bio: bio.trim(),
      role,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#e6f0eb] relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f2fcf6] text-[#404944] hover:text-[#141d1a] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-[#ecf6f1] text-[#004732] flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">manage_accounts</span>
          </div>
          <div>
            <h2 className="text-[19px] font-bold text-[#141d1a] tracking-tight">Edit Profile</h2>
            <p className="text-[12px] text-[#404944]">Update your avatar, username, and rescuer details</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#faece7] text-[#a13e28] rounded-xl text-[12px] font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          {/* Avatar Section */}
          <div className="p-3.5 bg-[#f2fcf6] rounded-2xl border border-[#e6f0eb] space-y-3">
            <span className="text-[12px] font-bold text-[#141d1a] block">Profile Picture</span>
            <div className="flex items-center gap-3.5">
              <div className="relative group">
                <img
                  src={avatar}
                  alt={nickname}
                  className="w-16 h-16 rounded-full object-cover ring-3 ring-[#004732] shadow-sm"
                />
                <label className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                  <span className="material-symbols-outlined text-white text-[20px]">photo_camera</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomPhoto}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-[#404944] mb-1.5 font-medium">
                  Choose preset or upload custom photo:
                </p>
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {AVATAR_PRESETS.map((p) => {
                    const isSelected = avatar === p.url;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setAvatar(p.url)}
                        className={`w-7 h-7 rounded-full overflow-hidden ring-2 transition-all flex-shrink-0 cursor-pointer ${
                          isSelected
                            ? 'ring-[#004732] scale-110'
                            : 'ring-transparent opacity-60 hover:opacity-100'
                        }`}
                        title={p.label}
                      >
                        <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                      </button>
                    );
                  })}
                </div>
                <label className="inline-flex items-center gap-1 text-[11px] font-bold text-[#004732] mt-1 cursor-pointer hover:underline">
                  <span className="material-symbols-outlined text-[14px]">upload_file</span>
                  <span>Upload from device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomPhoto}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Nickname & Username */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[12px] font-bold text-[#141d1a] mb-1">
                Nickname <span className="text-[#a13e28]">*</span>
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Display Name"
                className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl px-3 py-2 text-[13px] text-[#141d1a] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732]"
                required
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#141d1a] mb-1">
                Username <span className="text-[#a13e28]">*</span>
              </label>
              <div className="relative">
                <span className="text-[13px] text-[#707973] font-semibold absolute left-3 top-1/2 -translate-y-1/2">
                  @
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  placeholder="handle"
                  className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl pl-7 pr-3 py-2 text-[13px] text-[#141d1a] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Full Name & Role */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[12px] font-bold text-[#141d1a] mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Legal / Rescuer Name"
                className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl px-3 py-2 text-[13px] text-[#141d1a] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#141d1a] mb-1">
                Role &amp; Badge
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl px-2.5 py-2 text-[13px] text-[#141d1a] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732] cursor-pointer"
              >
                <option value="Volunteer Rescuer">Volunteer Rescuer</option>
                <option value="Foster Parent">Foster Parent</option>
                <option value="Pet Adopter">Pet Adopter</option>
                <option value="Animal Advocate">Animal Advocate</option>
              </select>
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[12px] font-bold text-[#141d1a] mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl px-3 py-2 text-[13px] text-[#141d1a] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-[#141d1a] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+62 8..."
                className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl px-3 py-2 text-[13px] text-[#141d1a] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732]"
              />
            </div>
          </div>

          {/* Rescue Zone / City */}
          <div>
            <label className="block text-[12px] font-bold text-[#141d1a] mb-1">
              Rescue Zone &amp; City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Jakarta (Selatan & Pusat), Bandung, Surabaya"
              className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl px-3 py-2 text-[13px] text-[#141d1a] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732]"
            />
          </div>

          {/* Bio / Rescuer Note */}
          <div>
            <label className="block text-[12px] font-bold text-[#141d1a] mb-1">
              Rescuer Bio
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief note about your rescue passion, foster experience, or favorite pets..."
              className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl px-3 py-2 text-[13px] text-[#141d1a] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732] resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-[#ecf6f1] text-[#404944] hover:text-[#141d1a] rounded-2xl font-bold text-[13px] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#004732] text-white hover:bg-[#003827] rounded-2xl font-bold text-[13px] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
