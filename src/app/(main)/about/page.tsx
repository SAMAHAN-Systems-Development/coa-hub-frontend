"use client";

import CardContainer from "@/components/layout/CardContainer";
import ContentContainer from "@/components/layout/ContentContainer";
import HeaderContainer from "@/components/layout/HeaderContainer";
import HeroContainer from "@/components/layout/HeroContainer";
import PageContainer from "@/components/layout/PageContainer";
import SectionContainer from "@/components/layout/SectionContainer";
import Spacer from "@/components/layout/Spacer";
import { useGroupedMembersQuery } from "@/lib/api/queries/membersQueries";
import { FullScreenLoader } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";

export default function AboutUs() {
  const { data: groupedMembers, isLoading, error } = useGroupedMembersQuery();

  // Find Core Officers category
  const coreOfficers = groupedMembers?.find(
    (group) => group.category.toLowerCase() === "core officers"
  );

  interface AboutUsData {
    imgSrc: string;
    title: string;
    subtitle: string;
  }

  interface ContactData {
    title: string;
    subtitle: string;
  }

  const aboutUsData: AboutUsData[] = [
    {
      imgSrc: "",
      title: "Streamline Submission",
      subtitle:
        "Easily upload and manage required reports in one secure hub, ensuring compliance with submission deadlines while reducing paperwork and manual errors.",
    },
    {
      imgSrc: "",
      title: "Real-Time Tracking",
      subtitle:
        "Monitor the status of your submissions anytime with built-in progress tracking and instant notifications, keeping you updated every step of the way.",
    },
    {
      imgSrc: "",
      title: "Secure & Reliable",
      subtitle:
        "Benefit from top-notch security protocols that protect sensitive data, ensuring confidentiality and reliability for both users and auditors.",
    },
  ];

  const contactData: ContactData[] = [
    { title: "GMAIL", subtitle: "@gmail.com" },
    { title: "PHONE", subtitle: "0XX-XXXX-XXXX" },
    { title: "FACEBOOK", subtitle: "facebook.com" },
  ];
  if (isLoading) {
    return <FullScreenLoader label="Loading core officers..." />;
  }

  if (error) {
    return (
      <>
        <HeroContainer title={"ABOUT US"} />
        <PageContainer>
          <ContentContainer>
            <EmptyState
              title="Error loading data"
              description="Failed to load core officers. Please try again."
            />
          </ContentContainer>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <HeroContainer title={"ABOUT US"} />
      <PageContainer>
        {/* first section */}
        <ContentContainer>
          <HeaderContainer title={"WHAT IS COA SUB HUB?"} center />
          <h1 className="text-center text-sm md:text-md lg:text-lg">
            This platform is an initiative of the Commission aimed at
            streamlining the submission process of required reports that undergo
            thorough auditing by 
            <span className="font-bold">CoA&apos;s</span> esteemed auditors.
          </h1>
          <SectionContainer card>
            {aboutUsData.map((item, index) => (
              <CardContainer
                key={index}
                imageSrc={item.imgSrc}
                imageAlt={item.title}
              >
                <Spacer size={2} />
                <h1 className="font-bold text-2xl">{item.title}</h1>
                <Spacer size={2} />
                <p className="text-justify text-sm md:text-md lg:text-lg">
                  {item.subtitle}
                </p>
              </CardContainer>
            ))}
          </SectionContainer>
        </ContentContainer>

        {/* second section */}
        <SectionContainer fullWidth bgColor>
          <HeaderContainer title="CORE OFFICERS" center noBg whiteText />
          <SectionContainer card firstCardFullWidth>
            {coreOfficers && coreOfficers.members.length > 0 ? (
              coreOfficers.members.map((member) => (
                <CardContainer
                  key={member.id}
                  imageSrc={member.imageUrl || ""}
                  imageAlt={member.name}
                >
                  <Spacer size={2} />
                  <h1 className="font-bold text-white text-2xl">
                    {member.name}
                  </h1>
                  <Spacer size={2} />
                  <p className="text-sm md:text-md lg:text-lg text-white">
                    {member.position}
                  </p>
                </CardContainer>
              ))
            ) : (
              <div className="col-span-full flex justify-center py-8">
                <p className="text-white text-lg">
                  No core officers available at the moment
                </p>
              </div>
            )}
          </SectionContainer>
        </SectionContainer>

        {/* third section */}
        <ContentContainer>
          <HeaderContainer title={"CONTACT"} center />
          <SectionContainer card>
            {contactData.map((item, index) => (
              <HeaderContainer
                key={index}
                title={item.title}
                subtitle={item.subtitle}
                center
              />
            ))}
          </SectionContainer>
        </ContentContainer>
      </PageContainer>
    </>
  );
}
