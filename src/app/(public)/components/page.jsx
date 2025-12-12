"use client";

import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import ServiceCard from "./components/ServiceCard";

export default function HomePage() {
  const demoServices = [
    { id: 1, title: "Electrician Service", desc: "Fix electrical issues", img: "/images/electric.jpg" },
    { id: 2, title: "Plumbing", desc: "Leak repair & installation", img: "/images/plumbing.jpg" },
    { id: 3, title: "AC Maintenance", desc: "Cooling & cleaning service", img: "/images/ac.jpg" },
  ];

  
  return (
    <div className="space-y-10">
      {/* Search */}
      <SearchBar />
      {/* Categories */}
      <Categories />
      {/* Services Grid */}
      {demoServices.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
