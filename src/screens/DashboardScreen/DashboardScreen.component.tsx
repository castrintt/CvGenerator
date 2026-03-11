import React, {useState} from 'react';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    useDraggable,
    useDroppable,
    pointerWithin,
} from '@dnd-kit/core';
import {
    AddButton,
    Board,
    Card,
    CardActions,
    Column,
    ColumnHeader,
    CardsList,
    Container,
    DragOverlayCard,
    FormRow,
    Header,
    InstructionNotice,
    ModalActions,
    ModalContent,
    ModalOverlay,
    RemoveCardBtn,
    UserInfo,
} from './DashboardScreen.styles';
import {Button} from '../../components/Button/Button';
import type {DashboardScreenComponentProps} from './DashboardScreen.types';
import type {JobApplication, JobApplicationSectionId} from '../../../business/domain/models/jobApplication.model';
import {SECTION_LABELS} from '../../../business/domain/models/jobApplication.model';

const formatDateBR = (isoDate: string): string => {
    if (!isoDate) return '';
    const [y, m, d] = isoDate.split('-');
    return d && m && y ? `${d}/${m}/${y}` : isoDate;
};

const SECTION_ORDER: JobApplicationSectionId[] = [
    'applied',
    'in_progress',
    'positive_feedback',
    'rejected',
    'cold',
];

type EditModalState = {
    jobApplication: JobApplication | null;
    sectionId: JobApplicationSectionId | null;
};

function JobApplicationCard({
    jobApplication,
    onEdit,
    onRemove,
}: {
    jobApplication: JobApplication;
    onEdit: () => void;
    onRemove: () => void;
}) {
    const {attributes, listeners, setNodeRef, isDragging} = useDraggable({
        id: jobApplication.id,
    });

    const displayCompany = jobApplication.company || 'Empresa não informada';
    const displayPosition = jobApplication.position || 'Cargo não informado';

    return (
        <Card ref={setNodeRef} $isDragging={isDragging} {...listeners} {...attributes}>
            <h4>{displayCompany}</h4>
            <p>{displayPosition}</p>
            <p style={{fontSize: 11, marginTop: 4}}>{formatDateBR(jobApplication.appliedDate)}</p>
            <CardActions>
                <button type="button" onClick={onEdit}>
                    Editar
                </button>
                <RemoveCardBtn type="button" onClick={onRemove}>
                    Excluir
                </RemoveCardBtn>
            </CardActions>
        </Card>
    );
}

function DroppableColumn({
    sectionId,
    jobApplications,
    onAdd,
    onEdit,
    onRemove,
    overId,
}: {
    sectionId: JobApplicationSectionId;
    jobApplications: JobApplication[];
    onAdd: () => void;
    onEdit: (item: JobApplication) => void;
    onRemove: (id: string) => void;
    overId: string | null;
}) {
    const {setNodeRef} = useDroppable({id: sectionId});
    const isOver =
        overId === sectionId || jobApplications.some((item) => item.id === overId);

    return (
        <Column ref={setNodeRef} $isOver={isOver}>
            <ColumnHeader>
                <h3>{SECTION_LABELS[sectionId]}</h3>
                <AddButton type="button" onClick={onAdd} title="Adicionar">
                    +
                </AddButton>
            </ColumnHeader>
            <CardsList>
                {jobApplications.map((item) => (
                    <JobApplicationCard
                        key={item.id}
                        jobApplication={item}
                        onEdit={() => onEdit(item)}
                        onRemove={() => onRemove(item.id)}
                    />
                ))}
            </CardsList>
        </Column>
    );
}

export const DashboardScreenComponent: React.FC<DashboardScreenComponentProps> = ({
    controller,
}) => {
    const [editModal, setEditModal] = useState<EditModalState>({
        jobApplication: null,
        sectionId: null,
    });
    const [overId, setOverId] = useState<string | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);

    const allJobApplications = SECTION_ORDER.flatMap(
        (sid) => controller.states.jobApplicationsBySection[sid]
    );
    const activeJobApplication = activeId
        ? allJobApplications.find((item) => item.id === activeId)
        : null;

    const openAddModal = (sectionId: JobApplicationSectionId) => {
        const newItem = controller.actions.addJobApplication(sectionId);
        setEditModal({jobApplication: newItem, sectionId});
    };

    const openEditModal = (item: JobApplication) => {
        setEditModal({jobApplication: item, sectionId: item.sectionId});
    };

    const closeModal = () => {
        setEditModal({jobApplication: null, sectionId: null});
    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(String(event.active.id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        setActiveId(null);
        setOverId(null);
        controller.actions.handleDragEnd(String(active.id), over ? String(over.id) : null);
    };

    const handleDragOver = (event: { over: { id: unknown } | null }) => {
        setOverId(event.over ? String(event.over.id) : null);
    };

    const handleSaveEdit = () => {
        if (!editModal.jobApplication) return;
        const form = document.getElementById('edit-job-form') as HTMLFormElement;
        if (!form) return;
        const formData = new FormData(form);
        controller.actions.updateJobApplication(editModal.jobApplication.id, {
            company: String(formData.get('company') ?? ''),
            position: String(formData.get('position') ?? ''),
            appliedDate: String(formData.get('appliedDate') ?? ''),
            link: String(formData.get('link') || '') || undefined,
            notes: String(formData.get('notes') || '') || undefined,
        });
        closeModal();
    };

    return (
        <Container>
            <Header>
                <h1>Controle de Candidaturas</h1>
                <UserInfo>
                    <span>{controller.states.userEmail}</span>
                    <Button variant="outline" onClick={controller.actions.logout}>
                        Sair
                    </Button>
                </UserInfo>
            </Header>

            <InstructionNotice>
                <strong>Como mover vagas:</strong> Clique e segure sobre um card e arraste-o até a seção desejada.
            </InstructionNotice>

            <DndContext
                collisionDetection={pointerWithin}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
            >
                <Board>
                    {SECTION_ORDER.map((sectionId) => (
                        <DroppableColumn
                            key={sectionId}
                            sectionId={sectionId}
                            jobApplications={controller.states.jobApplicationsBySection[sectionId]}
                            onAdd={() => openAddModal(sectionId)}
                            onEdit={openEditModal}
                            onRemove={controller.actions.removeJobApplication}
                            overId={overId}
                        />
                    ))}
                </Board>

                <DragOverlay>
                    {activeJobApplication ? (
                        <DragOverlayCard>
                            <h4>
                                {activeJobApplication.company || 'Empresa não informada'}
                            </h4>
                            <p>{activeJobApplication.position || 'Cargo não informado'}</p>
                            <p style={{fontSize: 11, marginTop: 4}}>
                                {formatDateBR(activeJobApplication.appliedDate)}
                            </p>
                        </DragOverlayCard>
                    ) : null}
                </DragOverlay>
            </DndContext>

            {editModal.jobApplication && (
                <ModalOverlay onClick={closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <h3>
                            {editModal.jobApplication.company ? 'Editar candidatura' : 'Nova candidatura'}
                        </h3>
                        <form id="edit-job-form" onSubmit={(e) => e.preventDefault()}>
                            <FormRow>
                                <label>Empresa</label>
                                <input
                                    name="company"
                                    defaultValue={editModal.jobApplication.company}
                                    placeholder="Nome da empresa"
                                />
                            </FormRow>
                            <FormRow>
                                <label>Cargo</label>
                                <input
                                    name="position"
                                    defaultValue={editModal.jobApplication.position}
                                    placeholder="Cargo desejado"
                                />
                            </FormRow>
                            <FormRow>
                                <label>Data da candidatura</label>
                                <input
                                    name="appliedDate"
                                    type="date"
                                    defaultValue={editModal.jobApplication.appliedDate}
                                />
                            </FormRow>
                            <FormRow>
                                <label>Link (opcional)</label>
                                <input
                                    name="link"
                                    type="url"
                                    defaultValue={editModal.jobApplication.link ?? ''}
                                    placeholder="https://..."
                                />
                            </FormRow>
                            <FormRow>
                                <label>Observações (opcional)</label>
                                <textarea
                                    name="notes"
                                    defaultValue={editModal.jobApplication.notes ?? ''}
                                    placeholder="Notas sobre a vaga..."
                                />
                            </FormRow>
                            <ModalActions>
                                <Button variant="outline" type="button" onClick={closeModal}>
                                    Cancelar
                                </Button>
                                <Button type="button" onClick={handleSaveEdit}>
                                    Salvar
                                </Button>
                            </ModalActions>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};
