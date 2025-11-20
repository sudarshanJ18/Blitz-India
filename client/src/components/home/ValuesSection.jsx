"use client";

import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { values } from "../../assets/assets";

// Custom microscope icon (clean, consistent)
const MicroscopeIcon = () => (
  <svg
    className="h-6 w-6 text-orange-600"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M3 7V5a2 2 0 012-2h2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 7V5a2 2 0 00-2-2h-2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 17v2a2 2 0 002 2h2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 17v2a2 2 0 01-2 2h-2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" />
  </svg>
);

const ValuesSection = () => {
  const valuesData = [
    {
      title: "Excellence",
      description:
        "Engineering excellence in every project, delivering solutions that exceed client expectations.",
      header: (
        <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${values.excellenceImg})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent hover:bg-orange-500/5 transition-all duration-300"></div>
          <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
            <span className="text-xs font-semibold text-gray-900">
              Quality First
            </span>
          </div>
        </div>
      ),
      icon: <IconClipboardCopy className="h-6 w-6 text-orange-600" />,
    },

    {
      title: "Innovation",
      description:
        "Cutting-edge technologies & innovative approaches to solve complex engineering challenges.",
      header: (
        <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${values.innovationImg})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent hover:bg-blue-500/5 transition-all duration-300"></div>
          <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
            <span className="text-xs font-semibold text-gray-900">
              Future Ready
            </span>
          </div>
        </div>
      ),
      icon: <IconFileBroken className="h-6 w-6 text-orange-600" />,
    },

    {
      title: "Collaboration",
      description:
        "Closely with our clients as partners, ensuring transparent communication and shared success.",
      header: (
        <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${values.collaborationImg})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent hover:bg-green-500/5 transition-all duration-300"></div>
          <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
            <span className="text-xs font-semibold text-gray-900">
              Team Work
            </span>
          </div>
        </div>
      ),
      icon: <IconSignature className="h-6 w-6 text-orange-600" />,
    },

    {
      title: "Integrity",
      description:
        "Highest standards of professional integrity, honesty, and ethical conduct in all our dealings.",
      header: (
        <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${values.integrityImg})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent hover:bg-purple-500/5 transition-all duration-300"></div>
          <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
            <span className="text-xs font-semibold text-gray-900">Trust & Ethics</span>
          </div>
        </div>
      ),
      icon: <IconTableColumn className="h-6 w-6 text-orange-600" />,
    },

    {
      title: "Customer Focus",
      description:
        "Success is our priority - delivering solutions that drive real business value and results.",
      header: (
        <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${values.customerFocusImg})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent hover:bg-red-500/5 transition-all duration-300"></div>
          <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
            <span className="text-xs font-semibold text-gray-900">Client First</span>
          </div>
        </div>
      ),
      icon: <MicroscopeIcon />, // fixed alignment + correct closing tag
    },
  ];

  const CustomTitle = ({ title, icon }) => (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center">{icon}</div>
      <span className="font-bold text-gray-900">{title}</span>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-orange-50/30 relative overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-500/5 rounded-full blur-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="mb-12">
          <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold">
            Core Values
          </p>
        </div>

        <BentoGrid className="max-w-7xl mx-auto">
          {valuesData.map((item, i) => (
            <BentoGridItem
              key={i}
              title={<CustomTitle title={item.title} icon={item.icon} />}
              description={item.description}
              header={item.header}
              className={i === 3 ? "md:col-span-2" : ""}
              background="bg-white/80 backdrop-blur-sm"
              border="border border-gray-200"
              hover="hover:shadow-xl hover:border-orange-200"
              descriptionClassName="text-base sm:text-lg font-medium"
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default ValuesSection;
