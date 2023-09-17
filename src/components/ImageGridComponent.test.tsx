import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import  ImageGridComponent  from './ImageGridComponent';
import { getFlickrImages } from './FlickrAPI';

jest.mock('./FlickrAPI', () => {
    console.log(getFlickrImages);
    return {
      getFlickrImages: jest.fn(() => Promise.resolve([])),
    };
  });

describe('ImageGridComponent', () => {
  const mockImages = [
    { url: 'https://example.com/image1.jpg', title: 'Image 1' },
    { url: 'https://example.com/image2.jpg', title: 'Image 2' }
  ];

  it('renders without crashing', () => {
    render(<ImageGridComponent searchTerm="test" onSelect={() => {}} />);
  });

  it('shows an error if the Flickr API returns an error', async () => {
    (getFlickrImages as jest.Mock).mockRejectedValueOnce(new Error('API error'));
    render(<ImageGridComponent searchTerm="test" onSelect={() => {}} />);
    await waitFor(() => expect(screen.getByText('Failed to fetch images from Flickr. Please check your internet connection or try again later.')).toBeInTheDocument());
  });

  it('displays a loading text while fetching data', () => {
    render(<ImageGridComponent searchTerm="test" onSelect={() => {}} />);
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  it('sets an alt text on the images', async () => {
    (getFlickrImages as jest.Mock).mockResolvedValueOnce(mockImages);
    render(<ImageGridComponent searchTerm="test" onSelect={() => {}} />);
    await waitFor(() => expect(screen.getByAltText('Image 1')).toBeInTheDocument());
  });
});