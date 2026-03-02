"use client";

import Image from "next/image";
import { useAppSelector } from "@/store/hooks";

export default function SchoolBrand() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex items-center gap-3">
      {user?.schoolLogo && (
        <Image
          src={user.schoolLogo}
          alt={user.schoolName || "School Logo"}
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <span className="font-semibold text-lg hidden sm:inline">
        {user?.schoolName || "Statvion ERP"}
      </span>
    </div>
  );
}
