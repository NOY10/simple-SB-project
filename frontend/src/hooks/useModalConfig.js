import { useMemo } from 'react';

const useModalConfig = (modalProps, entityName) =>
  useMemo(() => {
    const action = modalProps?.action;

    const isDelete = action === 'delete';
    const isEdit = action === 'edit';
    const isCreate = action === 'create';

    const title = isEdit ? `Edit ${entityName}` : isDelete ? `Delete ${entityName}` : `New ${entityName}`;

    const buttonLabel = isEdit ? 'Update' : isDelete ? 'Delete' : 'Save';

    return {
      isDelete,
      isEdit,
      isCreate,
      title,
      buttonLabel
    };
  }, [modalProps?.action, entityName]);

export default useModalConfig;
