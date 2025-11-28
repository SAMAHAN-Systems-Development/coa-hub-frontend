"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ContentContainer from "@/components/layout/ContentContainer";
import HeaderContainer from "@/components/layout/HeaderContainer";
import HeroContainer from "@/components/layout/HeroContainer";
import PageContainer from "@/components/layout/PageContainer";
import SectionContainer from "@/components/layout/SectionContainer";
import CardContainer from "@/components/layout/CardContainer";
import GeneralModal from "@/components/members-page/general-modal";
import AdminHeaderActions, {
  HeaderMode,
} from "@/components/members-page/admin-header-actions";
import { getAdminActionFromMode } from "@/components/members-page/admin-helpers";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface Member {
  id: string;
  name: string;
  position: string;
  email: string;
  imageSrc?: string;
}

export default function AdminMembersPage() {
  const router = useRouter();
  const [headerMode, setHeaderMode] = useState<HeaderMode>("default");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Mock data - replace with actual API data
  const coreOfficers: Member[] = [
    {
      id: "1",
      name: "John Doe",
      position: "President",
      email: "jd@addu.edu.ph",
    },
    {
      id: "2",
      name: "Jane Smith",
      position: "Vice President",
      email: "js@addu.edu.ph",
    },
    {
      id: "3",
      name: "Bob Johnson",
      position: "Secretary",
      email: "bj@addu.edu.ph",
    },
  ];

  const handleAddClick = () => {
    router.push("/admin/members/add-member");
  };

  const handleEditClick = () => {
    setHeaderMode("edit");
  };

  const handleDeleteClick = () => {
    setHeaderMode("delete");
  };

  const handleCancelAction = () => {
    setHeaderMode("default");
  };

  const handleCardEdit = (memberId: string) => {
    router.push(`/admin/members/edit-member/${memberId}`);
  };

  const handleCardDelete = (member: Member) => {
    setSelectedMember(member);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // temporary: implement delete
    console.log("Deleting member:", selectedMember?.id);
  };

  return (
    <ProtectedRoute requireAdmin>
      <HeroContainer title={"MEMBERS"} />
      <PageContainer>
        <ContentContainer>
          {/* Core Officers Section */}
          <SectionContainer>
            <HeaderContainer
              title={"COA AUDITORS (CORE OFFICERS)"}
              actions={
                <AdminHeaderActions
                  mode={headerMode}
                  onAdd={handleAddClick}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  onCancel={handleCancelAction}
                />
              }
            />
          </SectionContainer>

          <SectionContainer card firstCardFullWidth>
            {coreOfficers.map((member) => (
              <CardContainer
                key={member.id}
                imageSrc={member.imageSrc}
                imageAlt={member.name}
                adminAction={getAdminActionFromMode(headerMode)}
                onActionClick={() => {
                  if (headerMode === "edit") {
                    handleCardEdit(member.id);
                  } else if (headerMode === "delete") {
                    handleCardDelete(member);
                  }
                }}
              >
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.position}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </CardContainer>
            ))}
          </SectionContainer>

          {/* Add more sections as needed */}
        </ContentContainer>
      </PageContainer>

      <GeneralModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        variant="delete"
        memberName={selectedMember?.name}
        onConfirm={handleConfirmDelete}
      />
    </ProtectedRoute>
  );
}
