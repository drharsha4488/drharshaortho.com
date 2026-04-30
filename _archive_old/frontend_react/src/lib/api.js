import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Appointments
export const createAppointment = async (appointmentData) => {
  const response = await apiClient.post('/appointments', appointmentData);
  return response.data;
};

export const getAppointments = async () => {
  const response = await apiClient.get('/appointments');
  return response.data;
};

// Testimonials
export const getTestimonials = async () => {
  const response = await apiClient.get('/testimonials');
  return response.data;
};

export const createTestimonial = async (testimonialData) => {
  const response = await apiClient.post('/testimonials', testimonialData);
  return response.data;
};

// Blog
export const getBlogPosts = async () => {
  const response = await apiClient.get('/blog');
  return response.data;
};

export const getBlogPost = async (slug) => {
  const response = await apiClient.get(`/blog/${slug}`);
  return response.data;
};

// Contact
export const createContact = async (contactData) => {
  const response = await apiClient.post('/contact', contactData);
  return response.data;
};

export default apiClient;
