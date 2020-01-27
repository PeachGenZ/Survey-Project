library(shiny)
library(ggplot2)

#Test Data
topic <- c("ความเหมาะสมของเมนูการใช้งาน",
           "ความรวดเร็วในการตอบสนองของระบบ",
           "การจัดการรักษาความปลอดภัย และกำหนดสิทธิ์ในการเข้าถึงข้อมูลของผู้ใช้งาน",
           "ความง่าย (User Friendly) ของการใช้งานของระบบ",
           "ระบบฐานข้อมูลฯช่วยลดปริมาณการใช้กระดาษ"
)
choice1 <- c(10,20,23,20,10)
choice2 <- c(23,10,37,20,10)
choice3 <- c(22,30,20,20,20)
choice4 <- c(15,30,5,20,10)
choice5 <- c(30,10,15,20,50)
total <- choice1 + choice2 + choice3 + choice4 + choice5

my_df <- data.frame(topic, choice1, choice2, choice3, choice4, choice5, total)

# Define UI
ui <- fluidPage(
    titlePanel(
        h1("ผลลัพธ์", align="center")
    ),
    
    sidebarLayout(
        sidebarPanel(),
        mainPanel(
            tableOutput("my_df"),
            plotOutput("plot1"),
            plotOutput("plot2"),
            plotOutput("plot3"),
            plotOutput("plot4"),
            plotOutput("plot5")
        ),
    )
)

# Define server logic
server <- function(input, output){
    output$my_df <- renderTable(my_df)
    output$plot1<-renderPlot({ggplot(data = my_df, aes(x=choice1)) + geom_histogram(bins = 5,fill = "salmon") + theme_minimal()},height = 400,width = 600)
    output$plot2<-renderPlot({ggplot(data = my_df, aes(x=choice2)) + geom_histogram(bins = 5,fill = "gold") + theme_minimal()},height = 400,width = 600)
    output$plot3<-renderPlot({ggplot(data = my_df, aes(x=choice3)) + geom_histogram(bins = 5,fill = "green") + theme_minimal()},height = 400,width = 600)
    output$plot4<-renderPlot({ggplot(data = my_df, aes(x=choice4)) + geom_histogram(bins = 5,fill = "blue") + theme_minimal()},height = 400,width = 600)
    output$plot5<-renderPlot({ggplot(data = my_df, aes(x=choice5)) + geom_histogram(bins = 5,fill = "salmon") + theme_minimal()},height = 400,width = 600)
}

# Run the app
shinyApp(ui=ui,server=server)

