library(plumber)
library(readr)
library(ggplot2)
library(psych)

#* read thai string
Sys.setlocale("LC_CTYPE", "Thai")
options(encoding="UTF-8")

r <- plumb("plumber.R")  # Where 'plumber.R' is the location of the file shown above
r$run(port=8888)





