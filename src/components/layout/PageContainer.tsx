export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageContainer
 * - Centers content horizontally
 * - Max width 1200px
 * - Adds vertical spacing for hero/sections
 */
export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = "",
}) => (
  <div
    className={`mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 w-full min-h-screen flex flex-col gap-8 ${className}`}
  >
    {children}
  </div>
);

export default PageContainer;
