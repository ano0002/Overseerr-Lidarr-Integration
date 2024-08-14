import Header from '@app/components/Common/Header';
import ListView from '@app/components/Common/ListView';
import PageTitle from '@app/components/Common/PageTitle';
import useDiscover from '@app/hooks/useDiscover';
import Error from '@app/pages/_error';
import type { ArtistResult, ReleaseResult } from '@server/models/Search';
import { useRouter } from 'next/router';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  search: 'Search',
  searchresults: 'Search Results',
});

const MusicSearch = () => {
  const intl = useIntl();
  const router = useRouter();

  const {
    isLoadingInitialData,
    isEmpty,
    isLoadingMore,
    isReachingEnd,
    titles,
    fetchMore,
    error,
  } = useDiscover<ArtistResult | ReleaseResult>(
    `/api/v1/search/music`,
    {
      query: router.query.query,
    },
    { hideAvailable: false }
  );

  if (error) {
    return <Error statusCode={500} />;
  }

  return (
    <>
      <PageTitle title={intl.formatMessage(messages.search)} />
      <div className="mt-1 mb-5">
        <Header>{intl.formatMessage(messages.searchresults)}</Header>
      </div>
      <ListView
        items={titles}
        isEmpty={isEmpty}
        isLoading={
          isLoadingInitialData || (isLoadingMore && (titles?.length ?? 0) > 0)
        }
        isReachingEnd={isReachingEnd}
        onScrollBottom={fetchMore}
        force_big={true}
      />
    </>
  );
};

export default MusicSearch;
