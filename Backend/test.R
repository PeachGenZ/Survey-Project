# Create Object
#Object-Oriented Programming

# Assign <-
x <- 1
y <- 2
x+y

# remove object
rm(z)

# data types
# 1. numeric
# 2. logical
# 3. character

class(x) # check data type

### DATA STRUCTURE
    # 1.vector
    # 2.list
    # 3.matrix
    # 4.data frame

# VECTOR

a <- c(1,2,3,4,5) # concatenate
b <- c(1,0,0,1,0)

vec1 <- 1:10
vec <- rnorm(100)

rep(c(1,2,3), 10) # replicate
seq(0, 100, 5) # sequence

# logical vector
c(TRUE, FALSE, FALSE)
c(T, F, F)

# character vector
# names <- c("Peach", "Ronaldo", "Toys")

#list 

names <- c("Peach", "Ronando", "Messi")
age <- c(22, 33, 35)
club <- c("ManU", "Madrid", "Barca")
retired <- c(FALSE, FALSE, TRUE)

my_list <- list(names,age,club,retired)
