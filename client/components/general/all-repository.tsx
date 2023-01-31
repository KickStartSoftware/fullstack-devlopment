import React from 'react';
import Image from 'next/image';
import { Box, Button, Typography } from '../base';
import discord from '../../assets/discord.png';
import useGetPackages, { categorizePackages } from '../../hooks/packages';
import useDownloads from '../../hooks/downloads';

function Repository() {
  const { packages, loading } = useGetPackages();
  const categorized = categorizePackages(packages);

  const { togglePackage, isSelected, postDownloads } = useDownloads();

  return (
    <Box
      gutterTop="default"
      classname="bg-secondary-light px-4  mt-28 rounded-lg rounded-sm py-8 pt-12 md:px-8">
      <Typography variant="h1" text="Repository" textAlign="center" />
      <Box classname="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-6  py-12 mt-10 gap-x-6 gap-y-8">
        {Object.keys(categorized).map(category => (
          <Box key={category}>
            <Typography variant="h5" text={category} gutterBottom="md" />
            {categorized[category].map((p: any) => (
              <Box key={p._id} classname="flex items-center gap-x-4 mb-1">
                <input
                  type="checkbox"
                  checked={isSelected(p)}
                  onChange={() => togglePackage(p)}
                />
                <label className="flex items-center gap-2">
                  <Image
                    alt=""
                    src={p.iconUrl}
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
            ))}
          </Box>
        ))}
      </Box>
      <Box classname="w-full text-center mt-auto mb-4">
        <Button
          size="md"
          text="Download All Checked Apps"
          classname="mx-auto"
          onClick={postDownloads}
        />
      </Box>
    </Box>
  );
}

export default Repository;
