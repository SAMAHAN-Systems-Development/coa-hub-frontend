import ContentContainer from "@/components/layout/ContentContainer";
import HeaderContainer from "@/components/layout/HeaderContainer";
import HeroContainer from "@/components/layout/HeroContainer";
import PageContainer from "@/components/layout/PageContainer";
import SectionContainer from "@/components/layout/SectionContainer";

export default function MembersPage() {
  return (
    <>
      <HeroContainer title={"MEMBERS"} />
      <PageContainer>
        <ContentContainer>
          <SectionContainer>
            <HeaderContainer title={"COA AUDITORS (CORE OFFICERS)"} />
          </SectionContainer>
        </ContentContainer>
      </PageContainer>
    </>
  );
}
