import React from 'react';
import {
    DndContext,
    DragOverlay,
} from '@dnd-kit/core';
import {SortableContext, horizontalListSortingStrategy} from '@dnd-kit/sortable';
import {
    Board,
    BoardShell,
    Container,
    DeleteModalActions,
    DeleteModalBody,
    DeleteModalConfirm,
    DeleteModalContent,
    DeleteModalSectionName,
    DeleteModalWarning,
    DragOverlayCard,
    FormRow,
    Header,
    HeaderActions,
    HelpSection,
    ModalActions,
    ModalContent,
    ModalOverlay,
    ReadOnlyValue,
    UserInfo,
} from './DashboardScreen.styles';
import {Button} from '../../components/Button/Button';
import type {DashboardScreenComponentProps} from './DashboardScreen.types';
import {formatDateBR, maskDateBr, toExternalHref} from './DashboardScreen.utils';
import {DashboardScreenBoardColumn} from './DashboardScreen.board-column';

export const DashboardScreenComponent: React.FC<DashboardScreenComponentProps> = ({
    controller,
}) => {
    const s = controller.states;
    const a = controller.actions;

    return (
        <Container>
            <Header>
                <h1>Controle de Candidaturas</h1>
                <UserInfo>
                    <span>{s.userEmail}</span>
                    <HeaderActions>
                        <Button variant="outline" onClick={a.handleAddSection}>
                            + Nova seção
                        </Button>
                        <Button variant="outline" onClick={a.logout}>
                            Sair
                        </Button>
                    </HeaderActions>
                </UserInfo>
            </Header>

            <HelpSection>
                <strong>Seções:</strong> use <strong>+ Nova seção</strong>, preencha o nome e{' '}
                <strong>Salvar</strong> para criar. Para editar o nome ou excluir, use os ícones na coluna
                (✎ e ✕). Para <strong>mudar a ordem</strong> das seções, arraste pelo <strong>título</strong>{' '}
                da coluna. <strong>Candidaturas:</strong> o <strong>+</strong> na coluna abre o formulário; a
                vaga só é criada ao <strong>Salvar</strong>. Para <strong>mover</strong> uma candidatura,
                arraste o card até outra seção.
            </HelpSection>

            <DndContext
                sensors={s.sensors}
                collisionDetection={s.collisionDetection}
                onDragStart={a.handleDragStart}
                onDragEnd={a.handleDragEnd}
                onDragOver={a.handleDragOver}
            >
                <BoardShell>
                    <Board>
                        <SortableContext items={s.sectionIds} strategy={horizontalListSortingStrategy}>
                            {s.sections.map((section) => (
                                <DashboardScreenBoardColumn
                                    key={section.id}
                                    section={section}
                                    jobApplications={s.jobApplicationsBySection[section.id] ?? []}
                                    onAdd={() => a.openAddModal(section.id)}
                                    onView={a.openViewModal}
                                    onEdit={a.openEditModal}
                                    onRemove={a.removeJobApplication}
                                    onEditSection={() => a.openSectionModal(section, false)}
                                    onDeleteSection={() => a.handleDeleteSection(section.id)}
                                    overId={s.overId}
                                />
                            ))}
                        </SortableContext>
                    </Board>

                    <DragOverlay>
                        {s.activeJobApplication ? (
                            <DragOverlayCard>
                                <h4>
                                    {s.activeJobApplication.company || 'Empresa não informada'}
                                </h4>
                                <p>{s.activeJobApplication.position || 'Cargo não informado'}</p>
                                <p style={{fontSize: 11, marginTop: 4}}>
                                    {formatDateBR(s.activeJobApplication.appliedDate)}
                                </p>
                            </DragOverlayCard>
                        ) : s.activeSection ? (
                            <DragOverlayCard>
                                <h4>{s.activeSection.name}</h4>
                                <p style={{fontSize: 12, color: 'var(--text-secondary)'}}>Seção</p>
                            </DragOverlayCard>
                        ) : null}
                    </DragOverlay>
                </BoardShell>
            </DndContext>

            {s.isJobEditModalOpen && (
                <ModalOverlay onClick={a.closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <h3>{s.editModal.isNew ? 'Nova candidatura' : 'Editar candidatura'}</h3>
                        <form
                            id="edit-job-form"
                            key={s.editModal.jobApplication?.id ?? `new-job-${s.editModal.sectionId}`}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <FormRow>
                                <label>Empresa</label>
                                <input
                                    name="company"
                                    defaultValue={s.editModal.jobApplication?.company ?? ''}
                                    placeholder="Nome da empresa"
                                />
                            </FormRow>
                            <FormRow>
                                <label>Cargo</label>
                                <input
                                    name="position"
                                    defaultValue={s.editModal.jobApplication?.position ?? ''}
                                    placeholder="Cargo desejado"
                                />
                            </FormRow>
                            <FormRow>
                                <label>Data da candidatura</label>
                                <input
                                    name="appliedDate"
                                    type="text"
                                    placeholder="DD/MM/AAAA"
                                    defaultValue={
                                        s.editModal.jobApplication
                                            ? formatDateBR(s.editModal.jobApplication.appliedDate)
                                            : formatDateBR(s.newJobDefaultDateIso)
                                    }
                                    onInput={(e) => {
                                        e.currentTarget.value = maskDateBr(e.currentTarget.value);
                                    }}
                                />
                            </FormRow>
                            <FormRow>
                                <label>Link (opcional)</label>
                                <input
                                    name="link"
                                    type="url"
                                    defaultValue={s.editModal.jobApplication?.link ?? ''}
                                    placeholder="https://..."
                                />
                            </FormRow>
                            <FormRow>
                                <label>Observações (opcional)</label>
                                <textarea
                                    name="notes"
                                    defaultValue={s.editModal.jobApplication?.notes ?? ''}
                                    placeholder="Notas sobre a vaga..."
                                />
                            </FormRow>
                            <ModalActions>
                                <Button variant="outline" type="button" onClick={a.closeModal}>
                                    Cancelar
                                </Button>
                                <Button type="button" onClick={a.handleSaveEdit}>
                                    Salvar
                                </Button>
                            </ModalActions>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}

            {s.isViewJobModalOpen && s.viewModalJob && (
                <ModalOverlay onClick={a.closeViewModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <h3>Detalhes da candidatura</h3>
                        <FormRow>
                            <label>Empresa</label>
                            <ReadOnlyValue>
                                {s.viewModalJob.company.trim() || '—'}
                            </ReadOnlyValue>
                        </FormRow>
                        <FormRow>
                            <label>Cargo</label>
                            <ReadOnlyValue>
                                {s.viewModalJob.position.trim() || '—'}
                            </ReadOnlyValue>
                        </FormRow>
                        <FormRow>
                            <label>Data da candidatura</label>
                            <ReadOnlyValue>
                                {formatDateBR(s.viewModalJob.appliedDate)}
                            </ReadOnlyValue>
                        </FormRow>
                        <FormRow>
                            <label>Link (opcional)</label>
                            <ReadOnlyValue>
                                {s.viewModalJob.link?.trim() ? (
                                    <a
                                        href={toExternalHref(s.viewModalJob.link)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {s.viewModalJob.link}
                                    </a>
                                ) : (
                                    '—'
                                )}
                            </ReadOnlyValue>
                        </FormRow>
                        <FormRow>
                            <label>Observações (opcional)</label>
                            <ReadOnlyValue>
                                {s.viewModalJob.notes?.trim() ? s.viewModalJob.notes : '—'}
                            </ReadOnlyValue>
                        </FormRow>
                        <ModalActions>
                            <Button variant="outline" type="button" onClick={a.closeViewModal}>
                                Fechar
                            </Button>
                        </ModalActions>
                    </ModalContent>
                </ModalOverlay>
            )}

            {s.isSectionModalOpen && (
                <ModalOverlay onClick={a.closeSectionModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <h3>
                            {s.sectionModal.isNew && !s.sectionModal.section
                                ? 'Nova seção'
                                : 'Editar seção'}
                        </h3>
                        <form
                            id="edit-section-form"
                            key={s.sectionModal.section?.id ?? 'new-section'}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <FormRow>
                                <label>Nome da seção</label>
                                <input
                                    name="name"
                                    defaultValue={s.sectionModal.section?.name ?? ''}
                                    placeholder="Ex: Vagas Candidatadas"
                                />
                            </FormRow>
                            <ModalActions>
                                <Button variant="outline" type="button" onClick={a.closeSectionModal}>
                                    Cancelar
                                </Button>
                                <Button type="button" onClick={a.handleSaveSection}>
                                    Salvar
                                </Button>
                            </ModalActions>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}

            {s.deleteSectionConfirm && (
                <ModalOverlay onClick={a.cancelDeleteSection}>
                    <DeleteModalContent onClick={(e) => e.stopPropagation()}>
                        <h3>Excluir seção</h3>
                        <DeleteModalBody>
                            <DeleteModalWarning>
                                Existem {s.deleteSectionConfirm.cardsCount} vaga
                                {s.deleteSectionConfirm.cardsCount === 1 ? '' : 's'} cadastrada
                                {s.deleteSectionConfirm.cardsCount === 1 ? '' : 's'} na seção{' '}
                                <DeleteModalSectionName>
                                    &quot;{s.deleteSectionConfirm.sectionName}&quot;
                                </DeleteModalSectionName>
                                .
                            </DeleteModalWarning>
                            <DeleteModalWarning>
                                Se você excluir a seção, todas as vagas atreladas a ela serão perdidas.
                            </DeleteModalWarning>
                            <DeleteModalConfirm>Deseja realmente prosseguir?</DeleteModalConfirm>
                        </DeleteModalBody>
                        <DeleteModalActions>
                            <Button variant="outline" type="button" onClick={a.cancelDeleteSection}>
                                Cancelar
                            </Button>
                            <Button type="button" onClick={a.confirmDeleteSection}>
                                Prosseguir
                            </Button>
                        </DeleteModalActions>
                    </DeleteModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};
