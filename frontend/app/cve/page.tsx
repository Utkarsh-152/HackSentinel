"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, AlertTriangle, Calendar, Shield } from "lucide-react";

interface CVE {
  id: string;
  title: string;
  severity: "high" | "medium" | "low";
  description: string;
  affected_systems: string[];
  published_date: string;
}

export default function CVEPage() {
  const [cves, setCVEs] = useState<CVE[]>([]);
  const [filteredCVEs, setFilteredCVEs] = useState<CVE[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "high" | "medium" | "low">("all");

  useEffect(() => {
    const fetchCVEs = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('http://localhost:5000/cve');
        // const data = await response.json();
        
        // For demo purposes, we'll use the local JSON file
        const response = await fetch('/data/cve_data.json');
        const data = await response.json();
        
        setCVEs(data);
        setFilteredCVEs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching CVEs:", error);
        setLoading(false);
      }
    };

    fetchCVEs();
  }, []);

  useEffect(() => {
    // Filter CVEs based on search term and severity filter
    const results = cves.filter((cve) => {
      const matchesSearch = 
        cve.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cve.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cve.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSeverity = activeFilter === "all" || cve.severity === activeFilter;
      
      return matchesSearch && matchesSeverity;
    });
    
    setFilteredCVEs(results);
  }, [searchTerm, activeFilter, cves]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = (filter: "all" | "high" | "medium" | "low") => {
    setActiveFilter(filter);
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "high":
        return "severity-high pulse-animation";
      case "medium":
        return "severity-medium";
      case "low":
        return "severity-low";
      default:
        return "";
    }
  };

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
        <h1 className="text-4xl font-bold mb-4 cyber-glow-pink">
          CVE Database
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse and search the latest Common Vulnerabilities and Exposures (CVEs) affecting various systems and applications.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search CVEs by ID, title, or description..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 bg-background border-border/40 focus:border-[#FF007A] focus:ring-[#FF007A]/20"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => handleFilterClick("all")}
              className={activeFilter === "all" ? "bg-[#FF007A] hover:bg-[#FF007A]/80" : ""}
            >
              All
            </Button>
            <Button
              variant={activeFilter === "high" ? "default" : "outline"}
              onClick={() => handleFilterClick("high")}
              className={activeFilter === "high" ? "bg-red-600 hover:bg-red-700" : "text-red-500"}
            >
              <AlertTriangle className="mr-1 h-4 w-4" />
              High
            </Button>
            <Button
              variant={activeFilter === "medium" ? "default" : "outline"}
              onClick={() => handleFilterClick("medium")}
              className={activeFilter === "medium" ? "bg-orange-600 hover:bg-orange-700" : "text-orange-500"}
            >
              <AlertTriangle className="mr-1 h-4 w-4" />
              Medium
            </Button>
            <Button
              variant={activeFilter === "low" ? "default" : "outline"}
              onClick={() => handleFilterClick("low")}
              className={activeFilter === "low" ? "bg-green-600 hover:bg-green-700" : "text-green-500"}
            >
              <Shield className="mr-1 h-4 w-4" />
              Low
            </Button>
          </div>
        </div>
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence>
            {filteredCVEs.length > 0 ? (
              filteredCVEs.map((cve) => (
                <motion.div key={cve.id} variants={item} layout>
                  <Card className="glass-card h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className={`${getSeverityClass(cve.severity)} mb-2`}>
                          {cve.severity.toUpperCase()}
                        </Badge>
                        <span className="text-sm font-mono text-muted-foreground">
                          {cve.id}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-bold cyber-glow-pink text-[#FF007A]">
                        {cve.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4">{cve.description}</p>
                      <div className="text-sm text-muted-foreground">
                        <p className="mb-1"><strong>Affected Systems:</strong></p>
                        <ul className="list-disc pl-5">
                          {cve.affected_systems.map((system, index) => (
                            <li key={index}>{system}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-border/40">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        Published: {cve.published_date}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-lg text-muted-foreground">No CVEs found matching your search criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}