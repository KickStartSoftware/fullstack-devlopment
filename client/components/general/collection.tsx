import React from 'react';
import Image from 'next/image';
import { IPackage } from '../../hooks/packages';
import discord from '../../assets/discord.png';
import { FaTrash, FaDownload } from 'react-icons/fa';
import { Typography, Box, Button } from '../base';
import { ICollection, useDeleteCollection } from '../../hooks/collections';

export interface ICollectionProps {
  collection: ICollection;
  isSelected: (pkg: IPackage) => boolean;
  togglePackage: (pkg: IPackage) => void;
  removeCollection: (id: string) => void;
  postCollectionDownloads: (collection: ICollection) => void;
}

const Collection: React.FC<ICollectionProps> = ({
  collection,
  isSelected,
  togglePackage,
  removeCollection,
  postCollectionDownloads,
}) => {
  const { isDeleting, deleteCollection } = useDeleteCollection();

  return (
    <Box classname="bg-secondary-main px-3 py-3 md:px-6 rounded-xl shadow-md flex flex-col">
      <Typography
        variant="h5"
        color="primary"
        text={collection.name}
        gutterBottom="xl"
        classname="capitalize"
      />
      <Box gutterBottom="xl" classname="w-full">
        {collection.packages.map(p => {
          return (
            <Box key={p._id} classname="flex items-center gap-x-4">
              <input
                type="checkbox"
                checked={isSelected(p)}
                onChange={() => togglePackage(p)}
              />
              <label className="flex items-center gap-2">
                <Image
                  alt=""
                  src={p.iconUrl || ""}
                  width={20}
                  height={20}
                  className="w-5 "
                />
                <Typography
                  variant="body"
                  color="gray"
                  text={p.name}
                  weight="medium"
                  gutterBottom="none"
                />
              </label>
            </Box>
          );
        })}
      </Box>
      <Box classname="flex items-center w-full mt-auto justify-between">
        <Button
          size="md"
          classname="h-full"
          text={<FaDownload />}
          onClick={() => postCollectionDownloads(collection)}
        />
        <Button
          size="md"
          classname="h-full"
          text={<FaTrash />}
          color="danger"
          loading={isDeleting}
          onClick={() => deleteCollection(collection._id, removeCollection)}
        />
      </Box>
    </Box>
  );
};

export default Collection;
