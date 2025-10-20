import moment from "moment"

export const getQuickPicks = () => {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 2
  const currentDate = new Date().getDate()
  const formattedCurrentDate = `${currentYear}-${currentMonth}-${currentDate}`
  const dateFormat = "YYYY-MM-DD"

  const month = new Date().getMonth() + 1
  const quickPicks = [
    {
      title: "Today",
      startDate: `${currentYear}-${month}-${currentDate}`,
      endDate: `${currentYear}-${month}-${currentDate}`
    },
    {
      title: "Yesterday",
      startDate: formatMomentDate(moment(formattedCurrentDate, dateFormat).subtract("1", "days")),
      endDate: formatMomentDate(moment(formattedCurrentDate, dateFormat).subtract("1", "days"))
    },
    {
      title: "This Week",
      startDate: formatMomentDate(moment(formattedCurrentDate, dateFormat).startOf("week")),
      endDate: formatMomentDate(moment(formattedCurrentDate, dateFormat).endOf("week"))
    },
    {
      title: "Last Week",
      startDate: formatMomentDate(moment(formattedCurrentDate, dateFormat).subtract("1", "weeks").startOf("week")),
      endDate: formatMomentDate(moment(formattedCurrentDate, dateFormat).subtract("1", "weeks").endOf("week"))
    },
    {
      title: "This Month",
      startDate: `${currentYear}-${month}-01`,
      endDate: `${currentYear}-${month}-${moment(`${currentYear}-${month}`, "YYYY-MM").daysInMonth()}`
    },
    {
      title: "Last Month",
      startDate: formatMomentDate(moment(formattedCurrentDate, dateFormat).subtract("1", "months").startOf("month")),
      endDate: formatMomentDate(moment(formattedCurrentDate, dateFormat).subtract("1", "months").endOf("month"))
    },
    {
      title: "This Year",
      startDate: `${+currentYear - 1}-01-01`,
      endDate: `${+currentYear - 1}-12-31`
    },
    {
      title: "All",
      startDate: "",
      endDate: ""
    },
    {
      title: "Custom",
      startDate: "",
      endDate: ""
    },
  ]

  return quickPicks

}

const formatMomentDate = (momentDate) => {
  const date = momentDate ? momentDate.get("date") : ""
  const year = momentDate ? momentDate.get("year") : ""
  const month = momentDate ? momentDate.get("month") : ""

  return `${year}-${month}-${date}`
}