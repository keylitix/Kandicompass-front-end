// 'use client';

// import { useTheme } from 'next-themes';
// import { Toaster as Sonner, ToasterProps } from 'sonner';

// const Toaster = ({ ...props }: ToasterProps) => {
//   const { theme = 'system' } = useTheme();

//   return (
//     <Sonner
//       theme={theme as ToasterProps['theme']}
//       className="toaster group "
//       style={
//         {
//           '--normal-bg': 'var(--popover)',
//           '--normal-text': 'var(--popover-foreground)',
//           '--normal-border': 'var(--border)',
//         } as React.CSSProperties
//       }
//       {...props}
//     />
//   );
// };

// export { Toaster };

'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        classNames: {
          toast:
            'bg-[#1c102b] border border-[#3f2e6a] border-opacity-70 text-white rounded-lg shadow-lg ' +
            'hover:shadow-[0_0_20px_rgb(255,0,93)] transition-all duration-300',
          title:
            'text-sm font-semibold bg-gradient-to-r from-[#FF005D] to-[#00D1FF] bg-clip-text text-transparent',
          description: 'text-xs text-[#8a86a0]',
          actionButton:
            'bg-[#1c102b] text-white hover:bg-gradient-to-r from-[#FF005D] to-[#00D1FF] px-2 py-1 rounded-md',
          cancelButton: 'text-[#FF005D] hover:underline text-sm',
        },
      }}
      className="toaster z-[9999]"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };

