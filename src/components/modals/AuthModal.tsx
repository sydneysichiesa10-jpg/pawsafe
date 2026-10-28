import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { AVATAR_PRESETS, DEMO_RESCUER_PROFILE } from '../../data/mockData';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (profile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');

  // Sign in state
  const [signInIdentifier, setSignInIdentifier] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInError, setSignInError] = useState('');

  // Sign up state
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_PRESETS[0].url);
  const [customAvatarPreview, setCustomAvatarPreview] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState('');

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setSignUpError('Image must be under 3MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCustomAvatarPreview(base64);
        setSelectedAvatar(base64);
        setSignUpError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInIdentifier.trim()) {
      setSignInError('Please enter your email or username');
      return;
    }
    if (!signInPassword) {
      setSignInError('Please enter your password');
      return;
    }

    // Authenticate user
    const cleanHandle = signInIdentifier.replace('@', '').toLowerCase();
    const isSydney = cleanHandle.includes('sydney');

    const profile: UserProfile = {
      id: `user-${Date.now()}`,
      isLoggedIn: true,
      username: isSydney ? 'sydney_rescuer' : cleanHandle,
      nickname: isSydney ? 'Sydney' : cleanHandle.charAt(0).toUpperCase() + cleanHandle.slice(1),
      fullName: isSydney ? 'Sydney Sichiesa' : `${cleanHandle.charAt(0).toUpperCase() + cleanHandle.slice(1)} Rescuer`,
      email: signInIdentifier.includes('@') ? signInIdentifier : `${cleanHandle}@pawsafe.id`,
      avatar: isSydney ? AVATAR_PRESETS[0].url : AVATAR_PRESETS[1].url,
      bio: 'PawSafe member and compassionate animal advocate in Indonesia.',
      phone: '+62 812-8439-9102',
      city: 'Jakarta (Selatan & Pusat)',
      role: 'Volunteer Rescuer',
      rescuesAssisted: isSydney ? 12 : 1,
      petsFostered: isSydney ? 4 : 0,
      joinedDate: 'Joined March 2026',
    };

    onLoginSuccess(profile);
    onClose();
  };

  const handleDemoSignIn = () => {
    onLoginSuccess(DEMO_RESCUER_PROFILE);
    onClose();
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setSignUpError('Please enter your full name');
      return;
    }
    if (!nickname.trim()) {
      setSignUpError('Please provide a preferred nickname');
      return;
    }
    if (!username.trim()) {
      setSignUpError('Please choose a username');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setSignUpError('Please provide a valid email address');
      return;
    }
    if (!password || password.length < 6) {
      setSignUpError('Password must be at least 6 characters');
      return;
    }

    const cleanHandle = username.trim().replace(/^@+/, '').toLowerCase();
    const activeAvatar = customAvatarPreview || selectedAvatar;

    const newProfile: UserProfile = {
      id: `user-${Date.now()}`,
      isLoggedIn: true,
      username: cleanHandle,
      nickname: nickname.trim(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      avatar: activeAvatar,
      bio: 'New PawSafe rescuer ready to support animal welfare across Indonesia.',
      phone: '+62 812-0000-0000',
      city: 'Jakarta (Selatan & Pusat)',
      role: 'Animal Advocate',
      rescuesAssisted: 0,
      petsFostered: 0,
      joinedDate: 'Joined just now',
    };

    onLoginSuccess(newProfile);
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

        {/* Header Icon & Brand */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#ecf6f1] text-[#004732] flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[28px] icon-filled">pets</span>
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-[#141d1a] tracking-tight">
              {tab === 'signin' ? 'Welcome Back!' : 'Join PawSafe'}
            </h2>
            <p className="text-[12px] text-[#404944]">
              {tab === 'signin'
                ? 'Sign in to sync your rescues and profile'
                : 'Create your account to connect with shelters'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-[#ecf6f1] p-1 mb-5">
          <button
            type="button"
            onClick={() => {
              setTab('signin');
              setSignInError('');
            }}
            className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
              tab === 'signin'
                ? 'bg-white text-[#004732] shadow-sm'
                : 'text-[#404944] hover:text-[#141d1a]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('signup');
              setSignUpError('');
            }}
            className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
              tab === 'signup'
                ? 'bg-white text-[#004732] shadow-sm'
                : 'text-[#404944] hover:text-[#141d1a]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Notice: Optional sign in */}
        <div className="mb-4 px-3.5 py-2.5 bg-[#f2fcf6] rounded-2xl border border-[#aff0d2]/40 flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[18px] text-[#004732] flex-shrink-0 mt-0.5">
            info
          </span>
          <p className="text-[12px] text-[#29322e] leading-snug">
            <strong>Signing in is optional:</strong> You can explore pets, view radar sightings, and contact emergency vets as a guest anytime!
          </p>
        </div>

        {tab === 'signin' ? (
          /* Sign In Form */
          <form onSubmit={handleSignInSubmit} className="space-y-4">
            {signInError && (
              <div className="p-3 bg-[#faece7] text-[#a13e28] rounded-xl text-[12px] font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span>{signInError}</span>
              </div>
            )}

            <div>
              <label className="block text-[12px] font-bold text-[#141d1a] mb-1.5">
                Email or Username
              </label>
              <div className="relative">
                <span className="material-symbols-outlined text-[18px] text-[#707973] absolute left-3.5 top-1/2 -translate-y-1/2">
                  account_circle
                </span>
                <input
                  type="text"
                  placeholder="e.g. sydney_rescuer or email@example.com"
                  value={signInIdentifier}
                  onChange={(e) => setSignInIdentifier(e.target.value)}
                  className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl pl-10 pr-4 py-2.5 text-[14px] text-[#141d1a] placeholder:text-[#707973] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#141d1a] mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined text-[18px] text-[#707973] absolute left-3.5 top-1/2 -translate-y-1/2">
                  lock
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl pl-10 pr-4 py-2.5 text-[14px] text-[#141d1a] placeholder:text-[#707973] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#004732] text-white rounded-2xl font-bold text-[14px] shadow-sm hover:bg-[#003827] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              <span>Sign In</span>
            </button>

            {/* Quick Demo Rescuer Account */}
            <div className="pt-2 border-t border-[#e6f0eb]">
              <p className="text-[11px] text-[#707973] text-center mb-2">Want to test quickly?</p>
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="w-full py-2.5 bg-[#ecf6f1] text-[#004732] hover:bg-[#e0eae5] rounded-2xl font-bold text-[13px] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                <span>Sign In as Demo Rescuer (Sydney)</span>
              </button>
            </div>
          </form>
        ) : (
          /* Sign Up Form */
          <form onSubmit={handleSignUpSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            {signUpError && (
              <div className="p-3 bg-[#faece7] text-[#a13e28] rounded-xl text-[12px] font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span>{signUpError}</span>
              </div>
            )}

            {/* Avatar Selection */}
            <div>
              <label className="block text-[12px] font-bold text-[#141d1a] mb-1.5">
                Choose Profile Picture
              </label>
              <div className="flex items-center gap-3">
                <img
                  src={customAvatarPreview || selectedAvatar}
                  alt="Chosen avatar"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[#004732] shadow-sm flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-2 overflow-x-auto py-1">
                    {AVATAR_PRESETS.map((p) => {
                      const isSelected = selectedAvatar === p.url && !customAvatarPreview;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setSelectedAvatar(p.url);
                            setCustomAvatarPreview(null);
                          }}
                          className={`w-8 h-8 rounded-full overflow-hidden ring-2 transition-all flex-shrink-0 cursor-pointer ${
                            isSelected ? 'ring-[#004732] scale-110' : 'ring-transparent opacity-70 hover:opacity-100'
                          }`}
                          title={p.label}
                        >
                          <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                        </button>
                      );
                    })}
                  </div>
                  <label className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#004732] bg-[#ecf6f1] px-2.5 py-1 rounded-xl cursor-pointer hover:bg-[#e0eae5]">
                    <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                    <span>Upload Custom Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCustomPhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[12px] font-bold text-[#141d1a] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Budi Santoso"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl px-3 py-2 text-[13px] text-[#141d1a] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#141d1a] mb-1">
                  Nickname
                </label>
                <input
                  type="text"
                  placeholder="e.g. Budi"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl px-3 py-2 text-[13px] text-[#141d1a] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[12px] font-bold text-[#141d1a] mb-1">
                  Username
                </label>
                <div className="relative">
                  <span className="text-[13px] text-[#707973] font-semibold absolute left-3 top-1/2 -translate-y-1/2">
                    @
                  </span>
                  <input
                    type="text"
                    placeholder="budirescuer"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl pl-7 pr-3 py-2 text-[13px] text-[#141d1a] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#141d1a] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="budi@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl px-3 py-2 text-[13px] text-[#141d1a] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#141d1a] mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#f2fcf6] border border-[#e6f0eb] rounded-2xl px-3 py-2 text-[13px] text-[#141d1a] focus:outline-none focus:ring-2 focus:ring-[#004732]/30 focus:border-[#004732]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#004732] text-white rounded-2xl font-bold text-[14px] shadow-sm hover:bg-[#003827] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>Create My PawSafe Account</span>
            </button>
          </form>
        )}

        {/* Continue as Guest option at bottom */}
        <div className="mt-4 pt-3 border-t border-[#f2fcf6] text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-[12px] text-[#404944] hover:text-[#004732] font-semibold cursor-pointer underline underline-offset-2"
          >
            Continue browsing as Guest without signing in
          </button>
        </div>
      </div>
    </div>
  );
};
