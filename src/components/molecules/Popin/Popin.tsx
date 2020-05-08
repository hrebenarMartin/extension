import React from 'react';
import styled from 'styled-components';
import { BackgroundButton, Box, Paragraph } from '../../atoms';
import { Close } from '../../atoms/icons';

const PopinWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: rgba(5, 34, 75, 0.6);
`;

const PopinContent = styled(Box)`
  position: relative;
  max-width: 450px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 34px;
  padding-left: 34px;
  font-size: ${props => props.theme.fontSizeDefault};
  text-align: center;
  box-shadow: 0px 3px 6px #00000029;
`;

const PopinClose = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: block;
  width: 10px;
  height: 10px;

  & > svg {
    width: 10px;
    height: 10px;
  }
`;

const PopinList = styled.div`
  text-align: left;
`;

const PopinParagraph = styled(Paragraph)`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const Popin = () => {
  return (
    <PopinWrapper>
      <PopinContent>
        <PopinClose>
          <Close />
        </PopinClose>

        <PopinList>
          <PopinParagraph>
            Dismoi est actuellement disponible sur les navigateurs Chrome,
            Firefox et Opéra
          </PopinParagraph>
          <PopinParagraph>
            <strong>Chrome&nbsp;:&nbsp;</strong>
            https://chrome.google.com/webstore/search/dismoi
          </PopinParagraph>
          <PopinParagraph>
            <strong>Firefox&nbsp;:&nbsp;</strong>
            https://addons.mozilla.org/fr/firefox/addon/dismoi/
          </PopinParagraph>
          <PopinParagraph>
            <strong>Opera&nbsp;:&nbsp;</strong>
            https://www.dismoi.io/opera/
          </PopinParagraph>
        </PopinList>
      </PopinContent>

      <PopinContent>
        <PopinClose>
          <Close />
        </PopinClose>

        <PopinParagraph>
          Veuillez suivre Cécile Dupéré pour voir ses contributions.
        </PopinParagraph>

        <BackgroundButton>Suivre</BackgroundButton>
      </PopinContent>

      <PopinContent>
        <PopinClose>
          <Close />
        </PopinClose>

        <PopinParagraph>
          Pour voir les contributions de Cécile Dupéré, veuillez d’abord ajouter
          Dismoi à votre navigateur.
        </PopinParagraph>

        <BackgroundButton>Ajouter Dismoi à mon navigateur</BackgroundButton>
      </PopinContent>
    </PopinWrapper>
  );
};

export default Popin;
