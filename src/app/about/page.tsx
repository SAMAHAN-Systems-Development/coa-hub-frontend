import CardContainer from "@/components/layout/CardContainer";
import ContentContainer from "@/components/layout/ContentContainer";
import HeaderContainer from "@/components/layout/HeaderContainer";
import HeroContainer from "@/components/layout/HeroContainer";
import PageContainer from "@/components/layout/PageContainer";
import SectionContainer from "@/components/layout/SectionContainer";
import Spacer from "@/components/layout/Spacer";

export default function AboutUs() {
  interface AboutUsData {
    imgSrc: string;
    title: string;
    subtitle: string;
  }

  interface CoreOfficersData {
    imgSrc: string;
    name: string;
    position: string;
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

  const coreOfficersData: CoreOfficersData[] = [
    { imgSrc: "", name: "John Doe", position: "Position" },
    { imgSrc: "", name: "John Doe", position: "Position" },
    { imgSrc: "", name: "John Doe", position: "Position" },
    { imgSrc: "", name: "John Doe", position: "Position" },
    { imgSrc: "", name: "John Doe", position: "Position" },
    { imgSrc: "", name: "John Doe", position: "Position" },
    { imgSrc: "", name: "John Doe", position: "Position" },
  ];

  const contactData: ContactData[] = [
    { title: "GMAIL", subtitle: "@gmail.com" },
    { title: "PHONE", subtitle: "0XX-XXXX-XXXX" },
    { title: "FACEBOOK", subtitle: "facebook.com" },
  ];
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
            {coreOfficersData.map((item, index) => (
              <CardContainer
                key={index}
                imageSrc={item.imgSrc}
                imageAlt={item.name}
              >
                <Spacer size={2} />
                <h1 className="font-bold text-white text-2xl">{item.name}</h1>
                <Spacer size={2} />
                <p className="text-sm md:text-md lg:text-lg text-white">
                  {item.position}
                </p>
              </CardContainer>
            ))}
          </SectionContainer>
        </SectionContainer>

        {/* third section */}
        <ContentContainer>
          <HeaderContainer title={"CONTACT"} />
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
      <div>About Us</div>
    </>
  );
}
