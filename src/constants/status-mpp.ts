export const statusMpp = [
  { value: "DRAFTED", label: "Draft" },
  { value: "DRAFT", label: "Draft" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "IN PROGRESS", label: "In Progress" },
  { value: "NEED APPROVAL", label: "Need Approval" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "COMPLETED", label: "Completed" },
  { value: "open", label: "Open" },
  { value: "close", label: "Close" },
  { value: "complete", label: "Complete" },
  { value: "not_open", label: "Not Open" },
  { value: "OFF_BUDGET", label: "Off Budget" },
  { value: "ON_BUDGET", label: "On Budget" },
  { value: "APPLIED", label: "Applied" },
  { value: "HIGH", label: "High" },
  { value: "MEDIUM", label: "Medium" },
  { value: "LOW", label: "Low" },
  { value: "UPCOMING", label: "Upcoming" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "FINISHED", label: "Finished" },
];
export const getStatusLabel = (value: string) => {
  const status = statusMpp.find(
    (item) => value && item.value.toLowerCase() === value.toLowerCase()
  );
  return status ? status.label : value;
};
