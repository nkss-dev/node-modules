import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
} from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';

export interface DialogProps {
  children: React.ReactNode;
  className?: string;
  description: string;
  disableClickOutside?: boolean;
  onChange: (open: boolean) => void;
  open: boolean;
  title: string;
}

export default function Dialog({
  children,
  className,
  description,
  disableClickOutside,
  onChange,
  open,
  title,
}: DialogProps) {
  return (
    <Root open={open} onOpenChange={onChange}>
      <AnimatePresence>
        {open ? (
          <Portal forceMount>
            <Overlay asChild>
              <motion.div
                className="fixed inset-0 z-10 bg-main-950/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Overlay>
            <div className="fixed inset-0 z-10 grid place-items-center">
              <Content
                asChild
                onPointerDownOutside={(e) => {
                  if (disableClickOutside) e.preventDefault();
                }}
                className="relative"
              >
                <motion.div
                  className={clsx(
                    'overflow-y-auto rounded-lg bg-palette-800 shadow-md',
                    'p-6',
                    className
                  )}
                  initial={{ y: 4, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 2, opacity: 0 }}
                >
                  <Title>{title}</Title>
                  <Description>{description}</Description>
                  {children}
                  <div
                    style={{
                      display: 'flex',
                      marginTop: 25,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Close asChild>
                      <button className="bg-palette-500 p-2 rounded-lg">
                        Save changes
                      </button>
                    </Close>
                  </div>

                  <Close asChild>
                    <button
                      className="absolute top-5 right-5"
                      aria-label="Close"
                    >
                      <AiOutlineClose />
                    </button>
                  </Close>
                </motion.div>
              </Content>
            </div>
          </Portal>
        ) : null}
      </AnimatePresence>
    </Root>
  );
}
