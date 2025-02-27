"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  source: string;
  url: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('http://localhost:5000/news');
        // const data = await response.json();
        
        // For demo purposes, we'll use the local JSON file
        const response = await fetch('/data/cyber_news.json');
        const data = await response.json();
        
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4 cyber-glow">
          Latest Cybersecurity News
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay informed about the latest threats, vulnerabilities, and developments in the cybersecurity landscape.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="cyber-loading"></div>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {news.map((item) => (
              <motion.div key={item.id} variants={item} layout>
                <Card className="glass-card h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold cyber-glow text-[#00FFD1]">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-4 border-t border-border/40">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {item.date}
                    </div>
                    <div className="flex items-center text-sm">
                      <Link 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-[#00FFD1] hover:underline"
                      >
                        <span className="mr-1">{item.source}</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}