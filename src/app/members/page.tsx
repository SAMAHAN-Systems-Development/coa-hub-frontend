"use client";

import ContentContainer from "@/components/layout/ContentContainer";
import HeaderContainer from "@/components/layout/HeaderContainer";
import HeroContainer from "@/components/layout/HeroContainer";
import PageContainer from "@/components/layout/PageContainer";
import SectionContainer from "@/components/layout/SectionContainer";
import CardContainer from "@/components/layout/CardContainer";
import { useGroupedMembersQuery } from "@/lib/api/queries/membersQueries";
import { FullScreenLoader } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";

export default function MembersPage() {
  const { data: groupedMembers, isLoading, error } = useGroupedMembersQuery();

  // Sort categories by priority
  const sortedCategories = groupedMembers
    ? [...groupedMembers].sort((a, b) => {
        const priorityA = a.priorityNumber ?? 100;
        const priorityB = b.priorityNumber ?? 100;
        return priorityA - priorityB;
      })
    : [];

  if (isLoading) {
    return <FullScreenLoader label="Loading members..." />;
  }

  if (error) {
    return (
      <>
        <HeroContainer title={"MEMBERS"} />
        <PageContainer>
          <ContentContainer>
            <EmptyState
              title="Error loading members"
              description="Failed to load members. Please try again."
            />
          </ContentContainer>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <HeroContainer title={"MEMBERS"} />
      <PageContainer>
        <ContentContainer>
          {sortedCategories && sortedCategories.length > 0 ? (
            sortedCategories.map((group) => (
              <div key={group.categoryId}>
                <SectionContainer>
                  <HeaderContainer title={group.category.toUpperCase()} />
                </SectionContainer>

                <SectionContainer card firstCardFullWidth>
                  {group.members.length > 0 ? (
                    group.members.map((member) => (
                      <CardContainer
                        key={member.id}
                        imageSrc={member.imageUrl}
                        imageAlt={member.name}
                      >
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <p className="text-sm text-gray-600">
                          {member.position}
                        </p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </CardContainer>
                    ))
                  ) : (
                    <EmptyState
                      title="No members"
                      description="No members in this category yet."
                      className="mx-auto"
                    />
                  )}
                </SectionContainer>
              </div>
            ))
          ) : (
            <EmptyState
              title="No categories"
              description="No member categories found."
              className="mx-auto"
            />
          )}
        </ContentContainer>
      </PageContainer>
    </>
  );
}
