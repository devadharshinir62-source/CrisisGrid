export const EMERGENCY_TYPES = [
  { value: 'FLOOD', label: 'Flood', icon: 'Waves' },
  { value: 'FIRE', label: 'Fire Outbreak', icon: 'Flame' },
  { value: 'ACCIDENT', label: 'Vehicle Accident', icon: 'Car' },
  { value: 'MEDICAL', label: 'Medical Emergency', icon: 'HeartPulse' },
  { value: 'EARTHQUAKE', label: 'Earthquake', icon: 'Activity' },
  { value: 'CYCLONE', label: 'Cyclone / Storm', icon: 'Wind' },
  { value: 'LANDSLIDE', label: 'Landslide', icon: 'Mountain' },
  { value: 'OTHER', label: 'Other Hazard', icon: 'AlertTriangle' },
];

export const SEVERITIES = [
  { value: 'LOW', label: 'Low', badgeClass: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60' },
  { value: 'MEDIUM', label: 'Medium', badgeClass: 'bg-amber-950/80 text-amber-400 border-amber-800/60' },
  { value: 'HIGH', label: 'High', badgeClass: 'bg-orange-950/80 text-orange-400 border-orange-800/60' },
  { value: 'CRITICAL', label: 'Critical', badgeClass: 'bg-rose-950/90 text-rose-300 border-rose-700/80 ring-1 ring-rose-500/50' },
];

export const EMERGENCY_STATUSES = [
  { value: 'REPORTED', label: 'Reported', color: 'slate', badgeClass: 'bg-slate-800 text-slate-300 border-slate-700' },
  { value: 'VERIFIED', label: 'Verified', color: 'cyan', badgeClass: 'bg-cyan-950/80 text-cyan-400 border-cyan-800/60' },
  { value: 'ASSIGNED', label: 'Assigned', color: 'blue', badgeClass: 'bg-blue-950/80 text-blue-400 border-blue-800/60' },
  { value: 'DISPATCHED', label: 'Dispatched', color: 'indigo', badgeClass: 'bg-indigo-950/80 text-indigo-400 border-indigo-800/60' },
  { value: 'IN_PROGRESS', label: 'In Progress', color: 'amber', badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-700/60' },
  { value: 'RESOLVED', label: 'Resolved', color: 'emerald', badgeClass: 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60' },
  { value: 'REJECTED', label: 'Rejected', color: 'zinc', badgeClass: 'bg-zinc-800 text-zinc-400 border-zinc-700' },
];

export const REQUIRED_RESOURCES = [
  { value: 'AMBULANCE', label: 'Ambulance' },
  { value: 'MEDICAL_TEAM', label: 'Medical Team' },
  { value: 'RESCUE_TEAM', label: 'Search & Rescue Team' },
  { value: 'FOOD', label: 'Food Supplies' },
  { value: 'WATER', label: 'Clean Drinking Water' },
  { value: 'SHELTER', label: 'Emergency Shelter' },
  { value: 'BOAT', label: 'Rescue Boats' },
  { value: 'FIRE_TRUCK', label: 'Fire Truck' },
  { value: 'OTHER', label: 'Other Supplies' },
];
