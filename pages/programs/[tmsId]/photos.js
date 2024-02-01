
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';
import BackButton from '../../../components/BackButton';
import Head from 'next/head';
import useAxios from "../../../services/api";
import { useRouter } from 'next/router';
import Masonry from '@mui/lab/Masonry';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from '@mui/material/Container';


export async function getStaticProps({ params }) {
  const { tmsId } = params;

  const detailsUrl = `https://api.tvtalk.app/data/v1.1/programs/${tmsId}`;
  const photosUrl = `https://api.tvtalk.app/data/v1.1/programs/${tmsId}/images?imageSize=Ms&imageText=false`;

  const [detailsResponse, photosResponse] = await Promise.all([
    fetch(detailsUrl),
    fetch(photosUrl),
  ]);

  let details;
  let photos = [];

  try {
    details = await detailsResponse.json();
  } catch (error) {
    console.error("Error parsing details response:", error);
  }

  try {
    photos = await photosResponse.json();
  } catch (error) {
    console.error("Error parsing photos response:", error);
  }

  if (!details) {
    const otherDetailsUrl = `https://api.tvtalk.app/data/v1.1/programs/${tmsId}`;
    const otherDetailsResponse = await fetch(otherDetailsUrl);
    details = await otherDetailsResponse.json();
  }



  return {
    props: {
      details,
      photos
    }
  };
}

export async function getStaticPaths() {
  // If you can fetch a list of all possible tmsId values, do it here.
  // For this example, I'll assume you can't, so we'll use fallback mode.

  return {
    paths: [], // Empty array means no paths are pre-rendered.
    fallback: 'blocking' // 'blocking' means new paths will be generated on-demand without showing a loading state.
  };
}



const About = ({ heroImageDesktop, heroImageMobile, details, photos }) => {
  const { axios } = useAxios();
  const router = useRouter();
  const [ratingCache, setRatingCache] = useState(details.rating_percentage_cache || {});
  const [userRating, setUserRating] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const {
    preferred_image_uri,
    title,
    longDescription,
    releaseYear,
    genres,
    tmsId,
    totalSeasons
  } = details;

  const defaultPhoto = photos ? `https://${photos[0].src}` : null;

  return (
    <>
      <Head>
        <title>{title} Photos | TV Talk</title>
        <meta property="og:title" content={`About ${title} | TV Talk`} />
        <meta property="og:description" content={`${title} Photos at TV Talk`} />
        <meta property="og:image" content={defaultPhoto} />
      </Head>

      <Container maxWidth="xl">
        <Box sx={{ position: 'relative' }} >
          <div style={{ width: '100%', margin: '0 auto', position: 'relative' }}>
            <BackButton
              title='Back'
            />

          </div>
        </Box>

        <Typography sx={{
          fontSize: '48px',
          lineHeight: '47px',
          color: '#EFF2FD',
          fontWeight: '600',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          {'Photos'}
        </Typography>

        <Masonry
          columns={isMd ? 1 : 3}
          spacing={isMobile ? 2.5 : 3.5}
          defaultColumns={1}
          defaultSpacing={2.5}
          sx={{ margin: 0 }}
        >
          {photos?.map((photo) => (
            <img
              src={`https://${photo.uri}`}
              alt={`${details.title} ${photo.category}`}
            />
          ))}
        </Masonry>
      </Container >
    </>
  );
};

export default About;
