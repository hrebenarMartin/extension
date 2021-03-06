import React, { Component } from 'react';
import { InjectedFormProps } from 'redux-form';
import styled from 'styled-components';

import { Contribution } from 'app/lmem/notice';
import { FormMeta } from 'app/actions';
import NoticePreview from 'components/organisms/NoticePreview';
import { BackgroundButton, Button } from 'components/atoms';
import { Error, Form } from 'components/atoms/Forms';
import { handleFormSubmit } from 'app/utils/form';
import withReduxForm from './withReduxForm';

const PreviewForm = styled(Form)`
  padding: 12px 16px 12px 16px;
  display: flex;
  justify-content: space-around;
  min-width: 60%;
  align-self: center;
`;

const CancelButton = styled(Button)`
  margin-right: 20px;
`;

export interface PreviewScreenOwnProps {
  contribution: Contribution;
  modify: () => void;
  publish: (contribution: Contribution, meta: FormMeta) => void;
  errors: string[];
}

export type PreviewScreenProps = InjectedFormProps<
  Contribution,
  PreviewScreenOwnProps
> &
  PreviewScreenOwnProps;

class PreviewScreen extends Component<PreviewScreenProps> {
  get isButtonDisabled() {
    const { valid, submitting } = this.props;
    return !valid || submitting;
  }

  render() {
    const {
      contribution,
      handleSubmit,
      form,
      submitting,
      modify,
      publish,
      dirty,
      error
    } = this.props;

    return (
      <NoticePreview contribution={contribution}>
        <PreviewForm
          onSubmit={handleFormSubmit({ handleSubmit, form })(publish)}
        >
          <CancelButton onClick={modify}>Modifier</CancelButton>
          <BackgroundButton
            type="submit"
            disabled={this.isButtonDisabled}
            loading={submitting}
          >
            Envoyer
          </BackgroundButton>
        </PreviewForm>
        {dirty && error && <Error>{error}</Error>}
      </NoticePreview>
    );
  }
}

export default withReduxForm(PreviewScreen);
