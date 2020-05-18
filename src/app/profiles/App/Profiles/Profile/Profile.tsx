import React, { useState } from 'react';
import styled from 'styled-components';
import { ContributorId, StatefulContributor } from 'app/lmem/contributor';
import { Notice } from 'app/lmem/notice';
import Error from '../../Error';
import {
  Box,
  Button,
  ButtonWithIcon,
  Paragraph,
  Sidebar,
  Title2,
  TwoColumns
} from 'components/atoms';
import { Download } from 'components/atoms/icons';
import SimilarProfiles from './SimilarProfiles';
import FeaturedNotice from './FeaturedNotice';
import ProfileIntro from './ProfileIntro';
import ProfileNoticeList from './ProfileNoticeList';
import CenterContainer from 'components/atoms/CenterContainer';
import BrowserNotSupportedPopin from '../BrowserNotSupportedPopin';
import SubscribePopin from '../SubscribePopin';
import NotConnectedPopin, {
  NotConnectedPopinState
} from '../NotConnectedPopin';

const MainCol = styled.div`
  ${CenterContainer} {
    margin-top: 20px;

    ${Button} {
      font-size: 12px;
    }
  }
`;

const Aside = styled(Sidebar)`
  ${SimilarProfiles} + ${CenterContainer} {
    margin-top: -30px;
  }
`;

export const SidebarBox = styled(Box)`
  margin-bottom: ${props => props.theme.marginL};
  padding: 10px;

  &:first-of-type {
    margin-top: ${props => props.theme.marginM};
  }

  ${Button} {
    font-size: 13px;
  }

  ${ButtonWithIcon} {
    margin: 16px auto 0;
  }
`;

export interface ProfileProps {
  loading?: boolean;
  contributor?: StatefulContributor;
  noticesLoading?: boolean;
  notices: Notice[];
  featuredNotice?: Notice;
  subscribe: (contributorId: ContributorId) => void;
  unsubscribe: (contributorId: ContributorId) => void;
  contributors: StatefulContributor[];
  contributorsLoading?: boolean;
  connected?: boolean;
}

export const Profile = ({
  loading,
  contributor,
  subscribe,
  unsubscribe,
  noticesLoading,
  featuredNotice,
  notices,
  contributors,
  contributorsLoading,
  connected
}: ProfileProps) => {
  const [notConnectedPopinState, setNotConnectedPopinState] = useState<
    NotConnectedPopinState
  >({ opened: false, contributor });
  const [
    browserNotSupportedPopinOpened,
    setBrowserNotSupportedPopinOpened
  ] = useState(false);
  const [subscribePopinOpened, setSubscribePopinOpened] = useState(false);

  if (typeof loading === 'undefined') {
    return null;
  }

  if (!loading && !contributor) {
    return <Error />;
  }

  const handleSubscribe = (contributor?: StatefulContributor) => () => {
    if (contributor) {
      if (connected) {
        subscribe(contributor.id);
      } else {
        setNotConnectedPopinState({ opened: true, contributor });
      }
    }
  };

  const handleUnsubscribe = (contributor?: StatefulContributor) => () => {
    if (contributor) {
      if (connected) {
        unsubscribe(contributor.id);
      } else {
        setNotConnectedPopinState({ opened: true, contributor });
      }
    }
  };

  const handleSeeNoticeInContext = (notice?: Notice) => () => {
    if (connected) {
      if (contributor?.subscribed) {
        if (notice) {
          window.location.href = notice.url;
        }
      } else {
        setSubscribePopinOpened(true);
      }
    } else {
      setNotConnectedPopinState({ opened: true, contributor });
    }
  };

  return (
    <TwoColumns>
      <MainCol>
        <ProfileIntro
          loading={loading}
          contributor={contributor}
          subscribe={handleSubscribe(contributor)}
          unsubscribe={handleUnsubscribe(contributor)}
        />
        <Title2>
          La contribution phare {contributor && `de ${contributor.name}`}
        </Title2>
        <FeaturedNotice
          loading={noticesLoading}
          notice={featuredNotice}
          seeInContext={handleSeeNoticeInContext(featuredNotice)}
        />

        <Title2>Ses dernières contributions</Title2>
        <ProfileNoticeList
          loading={noticesLoading}
          notices={notices}
          seeNoticeInContext={handleSeeNoticeInContext}
        />
        <CenterContainer>
          <Button>Voir plus</Button>
        </CenterContainer>
      </MainCol>

      <Aside>
        <SidebarBox>
          <Paragraph>
            DisMoi permet aux internautes, médias et experts de vous informer
            directement sur les pages web que vous visitez.
          </Paragraph>

          <ButtonWithIcon>
            Ajouter à mon navigateur <Download />
          </ButtonWithIcon>
        </SidebarBox>

        <Title2>Profils similaires</Title2>

        <SimilarProfiles
          contributors={contributors}
          loading={contributorsLoading}
          subscribe={handleSubscribe}
          unsubscribe={handleUnsubscribe}
        />
        <CenterContainer>
          <Button to="/les-contributeurs">Voir tout</Button>
        </CenterContainer>
      </Aside>

      <NotConnectedPopin
        {...notConnectedPopinState}
        setOpened={(opened: boolean) =>
          setNotConnectedPopinState({
            ...notConnectedPopinState,
            opened
          })
        }
        addToBrowser={() => {
          setNotConnectedPopinState({
            ...notConnectedPopinState,
            opened: false
          });
          setBrowserNotSupportedPopinOpened(true);
        }}
      />

      <BrowserNotSupportedPopin
        opened={browserNotSupportedPopinOpened}
        setOpened={setBrowserNotSupportedPopinOpened}
      />

      {contributor && (
        <SubscribePopin
          contributor={contributor}
          subscribe={subscribe}
          opened={subscribePopinOpened}
          setOpened={setSubscribePopinOpened}
        />
      )}
    </TwoColumns>
  );
};

export default Profile;
