import { useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError, setIsOpened }) => {
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        if (formRef.current) {
          formRef.current.reset();
        }
        onSuccess();
        setIsOpened(true);

      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form ref={formRef} onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" isRequired />
          <Field placeholder="" label="Prénom" isRequired />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" type={FIELD_TYPES.EMAIL} isRequired />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field placeholder="message" label="Message" type={FIELD_TYPES.TEXTAREA} isRequired />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  setIsOpened: PropTypes.func.isRequired,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
