import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, Send, Calendar } from 'lucide-react';
import { createAppointment } from '@/lib/api';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createAppointment({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        preferred_date: formData.date || null,
        message: formData.message.trim() || null,
      });

      toast({
        title: 'Appointment Request Sent!',
        description: 'We will contact you within 24 hours to confirm your appointment.',
      });

      setFormData({ name: '', email: '', phone: '', date: '', message: '' });
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit appointment request. Please try again or call us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <SEO 
        title="Book Appointment - Best Orthopedic Surgeon Hyderabad | Dr. B Harsha Vardhana Reddy"
        description="Book appointment with Dr. B Harsha Vardhana Reddy at Yashoda Hospital Hitec City, Hyderabad. Expert orthopedic consultation for knee, hip, shoulder, and sports injuries. Call +91 99599 64567"
        keywords="book orthopedic appointment Hyderabad, orthopedic consultation, Yashoda Hospital Hitec City, knee pain doctor appointment, hip replacement consultation, sports injury appointment"
      />
      <section className="section-padding bg-gradient-to-br from-background to-teal-light" data-testid="contact-page">
        <div className="container-medical">
          <SectionHeading
            badge="Contact Us"
            title="Book Your Appointment with Best Orthopedic Surgeon in Hyderabad"
            subtitle="Schedule a consultation with Dr. B Harsha Vardhana Reddy at Yashoda Hospital, Hitec City. Expert treatment for all orthopedic conditions."
          />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-card rounded-xl p-6 shadow-md border border-border">
                <h3 className="text-xl font-serif font-semibold text-foreground mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-light rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Clinic Address</p>
                      <p className="text-sm text-muted-foreground">
                        Yashoda Hospitals, Hi-Tech City,<br />
                        Madhapur, Hyderabad,<br />
                        Telangana 500081
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-light rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <a href="tel:+919959964567" className="text-sm text-primary hover:underline">
                        +91 99599 64567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-light rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a href="mailto:drharsha4488@gmail.com" className="text-sm text-primary hover:underline">
                        drharsha4488@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-light rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Clinic Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Mon - Sat: 9:00 AM - 6:00 PM<br />
                        Sunday: Closed<br />
                        <span className="text-primary">Emergency: 24/7</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-card rounded-xl overflow-hidden shadow-md border border-border">
                <iframe
                  title="Yashoda Hospitals Hi-Tech City Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.542985842266!2d78.38568731487766!3d17.447701588042895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be7792411b!2sYashoda%20Hospital%20Hi-Tech%20City!5e0!3m2!1sen!2sin!4v1703699200000!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Appointment Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-xl p-6 md:p-8 shadow-md border border-border"
                data-testid="appointment-form"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-serif font-semibold text-foreground">
                    Request Appointment
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      data-testid="name-input"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        data-testid="email-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                        Phone *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                        data-testid="phone-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1">
                      Preferred Date
                    </label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      data-testid="date-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                      Describe Your Condition
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your symptoms or condition..."
                      rows={4}
                      data-testid="message-input"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:brightness-110 text-accent-foreground shadow-gold gap-2"
                    disabled={isSubmitting}
                    data-testid="submit-appointment-btn"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Appointment Request
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We'll contact you within 24 hours to confirm your appointment.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
