import React, {useState} from 'react';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    useDraggable,
    useDroppable,
    pointerWithin,
    closestCenter,
} from '@dnd-kit/core';
import {SortableContext, horizontalListSortingStrategy, useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {
    AddButton,
    Board,
    Card,
    CardActions,
    CardsList,
    Column,
    ColumnHeader,
    Container,
    DragOverlayCard,
    FormRow,
    Header,
    HeaderActions,
    InstructionNotice,
    DeleteModalActions,
    DeleteModalBody,
    DeleteModalConfirm,
    DeleteModalContent,
    DeleteModalSectionName,
    DeleteModalWarning,
    ModalActions,
    ModalContent,
    ModalOverlay,
    RemoveCardBtn,
    ScrollNotice,
    SectionDeleteBtn,
    SectionEditActions,
    SectionEditHeader,
    SortableSection,
    UserInfo,
} from './DashboardScreen.styles';
import {Button} from '../../components/Button/Button';
import type {DashboardScreenComponentProps} from './DashboardScreen.types';
import type {JobApplication} from '../../../business/domain/models/jobApplication.model';
import type {Section} from '../../../business/domain/models/section.model';

const formatDateBR = (isoDate: string): string => {
    if (!isoDate) return '';
    const [y, m, d] = isoDate.split('-');
    return d && m && y ? `${d}/${m}/${y}` : isoDate;
};

/** Converte DD/MM/AAAA para AAAA-MM-DD (ISO). Retorna string vazia se inválido. */
const brToIso = (brDate: string): string => {
    const trimmed = brDate.trim().replace(/\s/g, '');
    if (!trimmed) return '';
    const parts = trimmed.split('/');
    if (parts.length !== 3) return '';
    const [d, m, y] = parts;
    const day = parseInt(d, 10);
    const month = parseInt(m, 10);
    const year = parseInt(y, 10);
    if (isNaN(day) || isNaN(month) || isNaN(year)) return '';
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) return '';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${year}-${pad(month)}-${pad(day)}`;
};

/** Máscara para input DD/MM/AAAA */
const maskDateBr = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

type EditModalState = {
    jobApplication: JobApplication | null;
    sectionId: string | null;
};

type SectionModalState = {
    section: Section | null;
    isNew: boolean;
};

type DeleteSectionConfirmState = {
    sectionId: string;
    sectionName: string;
    cardsCount: number;
} | null;

function JobApplicationCard({
    jobApplication,
    colorKey,
    onEdit,
    onRemove,
    disabled,
}: {
    jobApplication: JobApplication;
    colorKey: string;
    onEdit: () => void;
    onRemove: () => void;
    disabled?: boolean;
}) {
    const {attributes, listeners, setNodeRef, isDragging} = useDraggable({
        id: jobApplication.id,
        disabled,
    });

    const displayCompany = jobApplication.company || 'Empresa não informada';
    const displayPosition = jobApplication.position || 'Cargo não informado';

    return (
        <Card
            ref={setNodeRef}
            $isDragging={isDragging}
            $colorKey={colorKey}
            {...(disabled ? {} : {...listeners, ...attributes})}
        >
            <h4>{displayCompany}</h4>
            <p>{displayPosition}</p>
            <p style={{fontSize: 11, marginTop: 4}}>{formatDateBR(jobApplication.appliedDate)}</p>
            {!disabled && (
                <CardActions>
                    <button type="button" onClick={onEdit}>
                        Editar
                    </button>
                    <RemoveCardBtn type="button" onClick={onRemove}>
                        Excluir
                    </RemoveCardBtn>
                </CardActions>
            )}
        </Card>
    );
}

function DroppableColumn({
    section,
    jobApplications,
    onAdd,
    onEdit,
    onRemove,
    overId,
    isEditMode,
}: {
    section: Section;
    jobApplications: JobApplication[];
    onAdd: () => void;
    onEdit: (item: JobApplication) => void;
    onRemove: (id: string) => void;
    overId: string | null;
    isEditMode: boolean;
}) {
    const {setNodeRef} = useDroppable({id: section.id});
    const isOver =
        !isEditMode && (overId === section.id || jobApplications.some((item) => item.id === overId));

    return (
        <Column ref={setNodeRef} $isOver={isOver} $colorKey={section.colorKey}>
            <ColumnHeader>
                <h3>{section.name}</h3>
                {!isEditMode && (
                    <AddButton type="button" onClick={onAdd} title="Adicionar">
                        +
                    </AddButton>
                )}
            </ColumnHeader>
            <CardsList>
                {jobApplications.map((item) => (
                    <JobApplicationCard
                        key={item.id}
                        jobApplication={item}
                        colorKey={section.colorKey}
                        onEdit={() => onEdit(item)}
                        onRemove={() => onRemove(item.id)}
                        disabled={isEditMode}
                    />
                ))}
            </CardsList>
        </Column>
    );
}

function SortableSectionColumn({
    section,
    jobApplications,
    onEditSection,
    onDeleteSection,
}: {
    section: Section;
    jobApplications: JobApplication[];
    onEditSection: () => void;
    onDeleteSection: () => void;
}) {
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
        id: section.id,
    });

    const style = transform
        ? {
              transform: CSS.Transform.toString(transform),
              transition,
          }
        : undefined;

    return (
        <SortableSection ref={setNodeRef} style={style} $isDragging={isDragging} {...listeners} {...attributes}>
            <Column $colorKey={section.colorKey}>
                <SectionEditHeader>
                    <h3>{section.name}</h3>
                    <SectionEditActions
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button type="button" onClick={onEditSection} title="Editar nome">
                            ✎
                        </button>
                        <SectionDeleteBtn type="button" onClick={onDeleteSection} title="Excluir seção">
                            ✕
                        </SectionDeleteBtn>
                    </SectionEditActions>
                </SectionEditHeader>
                <CardsList>
                    {jobApplications.map((item) => (
                        <Card key={item.id} $colorKey={section.colorKey}>
                            <h4>{item.company || 'Empresa não informada'}</h4>
                            <p>{item.position || 'Cargo não informado'}</p>
                            <p style={{fontSize: 11, marginTop: 4}}>{formatDateBR(item.appliedDate)}</p>
                        </Card>
                    ))}
                </CardsList>
            </Column>
        </SortableSection>
    );
}

export const DashboardScreenComponent: React.FC<DashboardScreenComponentProps> = ({
    controller,
}) => {
    const [editModal, setEditModal] = useState<EditModalState>({
        jobApplication: null,
        sectionId: null,
    });
    const [sectionModal, setSectionModal] = useState<SectionModalState>({
        section: null,
        isNew: false,
    });
    const [isEditSectionsMode, setIsEditSectionsMode] = useState(false);
    const [overId, setOverId] = useState<string | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [deleteSectionConfirm, setDeleteSectionConfirm] = useState<DeleteSectionConfirmState>(null);

    const allJobApplications = controller.states.sections.flatMap(
        (s) => controller.states.jobApplicationsBySection[s.id] ?? []
    );
    const activeJobApplication = activeId
        ? allJobApplications.find((item) => item.id === activeId)
        : null;

    const sectionIds = controller.states.sections.map((s) => s.id);

    const openAddModal = (sectionId: string) => {
        const newItem = controller.actions.addJobApplication(sectionId);
        setEditModal({jobApplication: newItem, sectionId});
    };

    const openEditModal = (item: JobApplication) => {
        setEditModal({jobApplication: item, sectionId: item.sectionId});
    };

    const closeModal = () => {
        setEditModal({jobApplication: null, sectionId: null});
    };

    const openSectionModal = (section: Section | null, isNew: boolean) => {
        setSectionModal({section, isNew});
    };

    const closeSectionModal = () => {
        setSectionModal({section: null, isNew: false});
    };

    const handleAddSection = () => {
        const newSection = controller.actions.addSection('Nova seção');
        openSectionModal(newSection, true);
    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(String(event.active.id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        const activeIdStr = String(active.id);
        const overIdStr = over ? String(over.id) : null;

        setActiveId(null);
        setOverId(null);

        if (isEditSectionsMode && sectionIds.includes(activeIdStr)) {
            const fromIndex = sectionIds.indexOf(activeIdStr);
            const toIndex = overIdStr ? sectionIds.indexOf(overIdStr) : -1;
            if (toIndex >= 0 && fromIndex !== toIndex) {
                controller.actions.reorderSections(fromIndex, toIndex);
            }
        } else if (!isEditSectionsMode && overIdStr) {
            controller.actions.handleDragEnd(activeIdStr, overIdStr);
        }
    };

    const handleDragOver = (event: { over: { id: unknown } | null }) => {
        setOverId(event.over ? String(event.over.id) : null);
    };

    const handleSaveEdit = () => {
        if (!editModal.jobApplication) return;
        const form = document.getElementById('edit-job-form') as HTMLFormElement;
        if (!form) return;
        const formData = new FormData(form);
        const brDate = String(formData.get('appliedDate') ?? '').trim();
        const isoDate = brToIso(brDate);
        const appliedDate = isoDate || editModal.jobApplication.appliedDate;
        controller.actions.updateJobApplication(editModal.jobApplication.id, {
            company: String(formData.get('company') ?? ''),
            position: String(formData.get('position') ?? ''),
            appliedDate,
            link: String(formData.get('link') || '') || undefined,
            notes: String(formData.get('notes') || '') || undefined,
        });
        closeModal();
    };

    const handleSaveSection = () => {
        if (!sectionModal.section) return;
        const form = document.getElementById('edit-section-form') as HTMLFormElement;
        if (!form) return;
        const formData = new FormData(form);
        controller.actions.updateSection(sectionModal.section.id, {
            name: String(formData.get('name') ?? '').trim() || 'Nova seção',
        });
        closeSectionModal();
    };

    const handleDeleteSection = (sectionId: string) => {
        const section = controller.states.sections.find((s) => s.id === sectionId);
        const cardsCount = controller.states.jobApplicationsBySection[sectionId]?.length ?? 0;
        if (cardsCount > 0 && section) {
            setDeleteSectionConfirm({
                sectionId,
                sectionName: section.name,
                cardsCount,
            });
        } else {
            if (window.confirm('Excluir esta seção?')) {
                controller.actions.removeSection(sectionId);
            }
        }
    };

    const confirmDeleteSection = () => {
        if (!deleteSectionConfirm) return;
        controller.actions.removeSection(deleteSectionConfirm.sectionId);
        setDeleteSectionConfirm(null);
    };

    return (
        <Container>
            <Header>
                <h1>Controle de Candidaturas</h1>
                <UserInfo>
                    <span>{controller.states.userEmail}</span>
                    <HeaderActions>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditSectionsMode(!isEditSectionsMode)}
                        >
                            {isEditSectionsMode ? 'Sair do modo edição' : 'Editar seções'}
                        </Button>
                        <Button variant="outline" onClick={handleAddSection}>
                            + Nova seção
                        </Button>
                        <Button variant="outline" onClick={controller.actions.logout}>
                            Sair
                        </Button>
                    </HeaderActions>
                </UserInfo>
            </Header>

            <InstructionNotice>
                <strong>Como mover vagas:</strong> Clique e segure sobre um card e arraste-o até a seção desejada.
            </InstructionNotice>

            {isEditSectionsMode && (
                <InstructionNotice>
                    <strong>Modo edição de seções:</strong> Arraste as seções para reordenar. Use os ícones para editar o nome ou excluir. Os cards não podem ser movidos neste modo.
                </InstructionNotice>
            )}

            <ScrollNotice>
                <strong>Dica:</strong> Arraste para o lado para ver as demais seções.
            </ScrollNotice>

            <DndContext
                collisionDetection={isEditSectionsMode ? closestCenter : pointerWithin}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
            >
                <Board>
                    {isEditSectionsMode ? (
                        <SortableContext items={sectionIds} strategy={horizontalListSortingStrategy}>
                            {controller.states.sections.map((section) => (
                                <SortableSectionColumn
                                    key={section.id}
                                    section={section}
                                    jobApplications={controller.states.jobApplicationsBySection[section.id] ?? []}
                                    onEditSection={() => openSectionModal(section, false)}
                                    onDeleteSection={() => handleDeleteSection(section.id)}
                                />
                            ))}
                        </SortableContext>
                    ) : (
                        <>
                            {controller.states.sections.map((section) => (
                                <DroppableColumn
                                    key={section.id}
                                    section={section}
                                    jobApplications={controller.states.jobApplicationsBySection[section.id] ?? []}
                                    onAdd={() => openAddModal(section.id)}
                                    onEdit={openEditModal}
                                    onRemove={controller.actions.removeJobApplication}
                                    overId={overId}
                                    isEditMode={false}
                                />
                            ))}
                        </>
                    )}
                </Board>

                {!isEditSectionsMode && (
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
                )}
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
                                    key={editModal.jobApplication.id}
                                    name="appliedDate"
                                    type="text"
                                    placeholder="DD/MM/AAAA"
                                    defaultValue={formatDateBR(editModal.jobApplication.appliedDate)}
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

            {sectionModal.section && (
                <ModalOverlay onClick={closeSectionModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <h3>{sectionModal.isNew ? 'Nova seção' : 'Editar seção'}</h3>
                        <form id="edit-section-form" onSubmit={(e) => e.preventDefault()}>
                            <FormRow>
                                <label>Nome da seção</label>
                                <input
                                    name="name"
                                    defaultValue={sectionModal.section.name}
                                    placeholder="Ex: Vagas Candidatadas"
                                />
                            </FormRow>
                            <ModalActions>
                                <Button variant="outline" type="button" onClick={closeSectionModal}>
                                    Cancelar
                                </Button>
                                <Button type="button" onClick={handleSaveSection}>
                                    Salvar
                                </Button>
                            </ModalActions>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}

            {deleteSectionConfirm && (
                <ModalOverlay onClick={() => setDeleteSectionConfirm(null)}>
                    <DeleteModalContent onClick={(e) => e.stopPropagation()}>
                        <h3>Excluir seção</h3>
                        <DeleteModalBody>
                            <DeleteModalWarning>
                                Existem {deleteSectionConfirm.cardsCount} vaga{deleteSectionConfirm.cardsCount === 1 ? '' : 's'} cadastrada{deleteSectionConfirm.cardsCount === 1 ? '' : 's'} na seção <DeleteModalSectionName>"{deleteSectionConfirm.sectionName}"</DeleteModalSectionName>.
                            </DeleteModalWarning>
                            <DeleteModalWarning>
                                Se você excluir a seção, todas as vagas atreladas a ela serão perdidas.
                            </DeleteModalWarning>
                            <DeleteModalConfirm>
                                Deseja realmente prosseguir?
                            </DeleteModalConfirm>
                        </DeleteModalBody>
                        <DeleteModalActions>
                            <Button variant="outline" type="button" onClick={() => setDeleteSectionConfirm(null)}>
                                Cancelar
                            </Button>
                            <Button type="button" onClick={confirmDeleteSection}>
                                Prosseguir
                            </Button>
                        </DeleteModalActions>
                    </DeleteModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};
