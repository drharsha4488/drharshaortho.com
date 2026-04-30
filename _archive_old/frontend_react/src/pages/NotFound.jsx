import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <Layout>
      <section className="section-padding min-h-[60vh] flex items-center justify-center" data-testid="not-found-page">
        <div className="container-medical text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-8xl font-serif font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/">
                <Button className="bg-primary hover:brightness-110 text-primary-foreground gap-2" data-testid="go-home-btn">
                  <Home className="w-4 h-4" />
                  Go to Homepage
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="gap-2"
                data-testid="go-back-btn"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
