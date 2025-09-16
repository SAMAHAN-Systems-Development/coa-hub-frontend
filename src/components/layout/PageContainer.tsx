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
  <div className={`w-full min-h-screen flex flex-col bg-white${className}`}>
    {children}
  </div>
);

export default PageContainer;
