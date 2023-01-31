import React from 'react';
import { AuthPage } from '../../@types/auth';
import { Box, Button, Typography } from '../../components/base';
import Select from 'react-select';
import { Content } from '../../components/general/content';
import PageHeader from '../../components/general/page-header';
import useGetPackages from '../../hooks/packages';
import useGetCollections, {
  ICollection,
  useCreateCollection,
} from '../../hooks/collections';
import classNames from 'classnames';
import { LoaderRings } from '../../components/base/loader';
import { IOption } from '../../hooks';
import Collection from '../../components/general/collection';
import Repository from '../../components/general/all-repository';
import useDownloads from '../../hooks/downloads';

const PersonalVault: AuthPage = () => {
  const [name, setName] = React.useState('');
  const { loading, packages } = useGetPackages();
  const [selected, setSelected] = React.useState<IOption[]>([]);
  const {
    loading: loadingCollections,
    collections,
    addNewcollection,
    removeCollection,
  } = useGetCollections();

  const { togglePackage, isSelected, postCollectionDownloads, postDownloads } =
    useDownloads();
  const { createCollection, isCreating } = useCreateCollection();

  const handleSelect = (value: any) => {
    setSelected(value);
  };

  const handleFormReset = () => {
    setName('');
    setSelected([]);
  };

  return (
    <Box>
      <PageHeader />
      <Content>
        <Box classname="grid-cols-1 grid gap-y-8 md:gap-y-0  md:grid-cols-[30%_70%] md:justify-between xl:grid-cols-[30%_60%]">
          <Box>
            <form
              className="bg-secondary-light rounded-md shadow-md px-4 py-6"
              onSubmit={async e => {
                e.preventDefault();
                createCollection(
                  name,
                  selected.map(p => p.value),
                  (collection: ICollection) => {
                    addNewcollection(collection);
                    handleFormReset();
                  }
                );
              }}>
              <Typography
                variant="h4"
                weight="medium"
                gutterBottom="xl"
                text="Create a new collection"
              />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Give your collection a name"
                className="flex-1 block h-[2.5rem] px-2 outline-none border-none w-full bg-white rounded-lg mb-5"
              />
              <Select
                isMulti
                placeholder="Select packages"
                options={packages.map(p => ({
                  value: p._id,
                  label: p.name,
                }))}
                value={selected}
                isLoading={loading}
                onChange={handleSelect}
              />
              <Button
                size="md"
                type="submit"
                gutterTop="xl"
                fullwidth={false}
                text="Add collection"
                loading={isCreating}
              />
            </form>
          </Box>
          <Box
            classname={classNames(
              'bg-secondary-light rounded-md shadow-md px-4 py-6 min-h-[400px] text-white',
              {
                'flex items-center justify-center': loadingCollections,
                'flex flex-col items-center justify-center':
                  !loadingCollections && collections.length === 0,
                'flex flex-col': !loadingCollections && collections.length > 0,
              }
            )}>
            {loadingCollections && <LoaderRings />}
            {!loadingCollections && collections.length === 0 && (
              <>
                <Typography
                  variant="h3"
                  weight="medium"
                  gutterBottom="xl"
                  text="No collections found"
                />
                <Typography
                  variant="h6"
                  weight="medium"
                  text="Start creating a new collection by choosing packages"
                />
              </>
            )}

            {collections.length > 0 && !loadingCollections && (
              <Box classname="w-full grid mb-10 grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 md:gap-x-6 2xl:grid-cols-3">
                {collections.map(collection => (
                  <Collection
                    key={collection.name}
                    collection={collection}
                    isSelected={isSelected}
                    togglePackage={togglePackage}
                    removeCollection={removeCollection}
                    postCollectionDownloads={postCollectionDownloads}
                  />
                ))}
              </Box>
            )}
            {collections.length > 0 && !loadingCollections && (
              <Box classname="w-full text-center mt-auto mb-4">
                <Button
                  size="md"
                  text="Download All Checked Apps"
                  classname="mx-auto"
                  onClick={postDownloads}
                />
              </Box>
            )}
          </Box>
        </Box>
        <Repository />
        <Box className="pt-28" />
      </Content>
    </Box>
  );
};

PersonalVault.auth = {
  fullScreen: true,
};

export default PersonalVault;
