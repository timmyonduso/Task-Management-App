import { format } from "date-fns"

// Function to format the date
export const formatDate = (dateString: string | null) => {
  if (!dateString) return "No due date"
  try {
    return format(new Date(dateString), "MMM d, yyyy")
  } catch (error) {
    return "Invalid date"
  }
}

