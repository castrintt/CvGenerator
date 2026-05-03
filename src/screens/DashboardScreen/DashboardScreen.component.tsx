import {
    DndContext,
    DragOverlay,
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '../../components/Button/Button';
import { DashboardScreenBoardColumn } from './DashboardScreen.board-column';
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
    HeaderLeft,
    HeaderRight,
    ModalActions,
    ModalContent,
    ModalOverlay,
    PageSubtitle,
    ReadOnlyValue,
} from './DashboardScreen.styles';
import type { DashboardScreenComponentProps, JobApplicationFormValues } from './DashboardScreen.types';
import { formatDateBR, maskDateBr, toExternalHref } from './DashboardScreen.utils';

export const DashboardScreenComponent: React.FC<DashboardScreenComponentProps> = ({
    controller,
}) => {
    const s = controller.states;
    const a = controller.actions;

    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <h1>Application Pipeline</h1>
                    <PageSubtitle>Gerencie e acompanhe suas oportunidades de emprego ativas.</PageSubtitle>
                </HeaderLeft>
                <HeaderRight>
                    <HeaderActions>
                        <Button variant="outline" onClick={a.navigateToProfile}>
                            Meu Perfil
                        </Button>
                        <Button variant="outline" onClick={a.handleAddSection}>
                            + Nova Categoria
                        </Button>
                        <Button variant="outline" onClick={a.logout}>
                            Sair
                        </Button>
                    </HeaderActions>
                </HeaderRight>
            </Header>

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
                                <p style={{ fontSize: 11, marginTop: 4 }}>
                                    {formatDateBR(s.activeJobApplication.appliedDate)}
                                </p>
                            </DragOverlayCard>
                        ) : s.activeSection ? (
                            <DragOverlayCard>
                                <h4>{s.activeSection.name}</h4>
                                <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Seção</p>
                            </DragOverlayCard>
                        ) : null}
                    </DragOverlay>
                </BoardShell>
            </DndContext>

            {s.isJobEditModalOpen && (
                <ModalOverlay onClick={a.closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <h3>{s.editModal.isNew ? 'Nova candidatura' : 'Editar candidatura'}</h3>
                        <form onSubmit={s.jobForm.handleSubmit(a.onSubmitJobApplicationForm)}>
                            <FormRow>
                                <label>Empresa</label>
                                <input
                                    {...s.jobForm.register('company')}
                                    placeholder="Nome da empresa"
                                />
                            </FormRow>
                            <FormRow>
                                <label>Cargo</label>
                                <input
                                    {...s.jobForm.register('position')}
                                    placeholder="Cargo desejado"
                                />
                            </FormRow>
                            <FormRow>
                                <label>Data da candidatura</label>
                                <Controller<JobApplicationFormValues>
                                    name="appliedDate"
                                    control={s.jobForm.control}
                                    render={({field}) => (
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="DD/MM/AAAA"
                                            onChange={(e) =>
                                                field.onChange(maskDateBr(e.target.value))
                                            }
                                        />
                                    )}
                                />
                            </FormRow>
                            <FormRow>
                                <label>Link (opcional)</label>
                                <input
                                    {...s.jobForm.register('link')}
                                    type="url"
                                    placeholder="https://..."
                                />
                            </FormRow>
                            <FormRow>
                                <label>Observações (opcional)</label>
                                <textarea
                                    {...s.jobForm.register('notes')}
                                    placeholder="Notas sobre a vaga..."
                                />
                            </FormRow>
                            <ModalActions>
                                <Button variant="outline" type="button" onClick={a.closeModal}>
                                    Cancelar
                                </Button>
                                <Button type="submit">
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
                        <form onSubmit={s.sectionForm.handleSubmit(a.onSubmitSectionForm)}>
                            <FormRow>
                                <label>Nome da seção</label>
                                <input
                                    {...s.sectionForm.register('name')}
                                    placeholder="Ex: Vagas Candidatadas"
                                />
                            </FormRow>
                            <ModalActions>
                                <Button variant="outline" type="button" onClick={a.closeSectionModal}>
                                    Cancelar
                                </Button>
                                <Button type="submit">
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
                            {s.deleteSectionConfirm.cardsCount > 0 && (
                                <>
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
                                        Se você excluir a categoria, todas as vagas atreladas a ela serão perdidas.
                                    </DeleteModalWarning>
                                </>
                            )}
                            <DeleteModalConfirm>
                                Deseja realmente excluir a categoria &quot;{s.deleteSectionConfirm.sectionName}&quot;?
                            </DeleteModalConfirm>
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
