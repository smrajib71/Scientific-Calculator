"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0")
  const [expression, setExpression] = useState("")
  const [memory, setMemory] = useState(0)
  const [isRadians, setIsRadians] = useState(true)

  // Scientific functions
  const scientific = {
    sin: (x: number) => Math.sin(isRadians ? x : (x * Math.PI) / 180),
    cos: (x: number) => Math.cos(isRadians ? x : (x * Math.PI) / 180),
    tan: (x: number) => Math.tan(isRadians ? x : (x * Math.PI) / 180),
    log: (x: number) => Math.log10(x),
    ln: (x: number) => Math.log(x),
    sqrt: (x: number) => Math.sqrt(x),
    square: (x: number) => Math.pow(x, 2),
    factorial: (x: number) => {
      if (x < 0) return NaN
      if (x === 0) return 1
      let result = 1
      for (let i = 1; i <= x; i++) result *= i
      return result
    },
  }

  const handleNumber = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num))
    setExpression((prev) => prev + num)
  }

  const handleOperator = (op: string) => {
    setDisplay("0")
    setExpression((prev) => prev + op)
  }

  const handleScientific = (func: keyof typeof scientific) => {
    try {
      const value = parseFloat(display)
      const result = scientific[func](value)
      setDisplay(result.toString())
      setExpression(`${func}(${value})`)
    } catch (error) {
      setDisplay("Error")
    }
  }

  const handleEqual = () => {
    try {
      // Replace scientific function names with their actual JavaScript implementations
      let evalExpression = expression
        .replace(/sin/g, `Math.sin${isRadians ? "" : "* Math.PI / 180"}`)
        .replace(/cos/g, `Math.cos${isRadians ? "" : "* Math.PI / 180"}`)
        .replace(/tan/g, `Math.tan${isRadians ? "" : "* Math.PI / 180"}`)
        .replace(/log/g, "Math.log10")
        .replace(/ln/g, "Math.log")
        .replace(/sqrt/g, "Math.sqrt")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")

      const result = eval(evalExpression)
      setDisplay(result.toString())
      setExpression(result.toString())
    } catch (error) {
      setDisplay("Error")
    }
  }

  const handleClear = () => {
    setDisplay("0")
    setExpression("")
  }

  const handleMemory = (operation: string) => {
    const currentValue = parseFloat(display)
    switch (operation) {
      case "MC":
        setMemory(0)
        break
      case "MR":
        setDisplay(memory.toString())
        setExpression(memory.toString())
        break
      case "M+":
        setMemory((prev) => prev + currentValue)
        break
      case "M-":
        setMemory((prev) => prev - currentValue)
        break
    }
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key
    if (/[0-9]/.test(key)) {
      handleNumber(key)
    } else if (["+", "-", "*", "/", "(", ")", "."].includes(key)) {
      handleOperator(key)
    } else if (key === "Enter") {
      handleEqual()
    } else if (key === "Escape") {
      handleClear()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="mb-4 space-y-2">
          <div className="text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
            {expression || "0"}
          </div>
          <div className="text-3xl font-bold text-right overflow-x-auto">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {/* Memory Functions */}
          <Button
            variant="secondary"
            onClick={() => handleMemory("MC")}
            className="text-sm"
          >
            MC
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleMemory("MR")}
            className="text-sm"
          >
            MR
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleMemory("M+")}
            className="text-sm"
          >
            M+
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleMemory("M-")}
            className="text-sm"
          >
            M-
          </Button>
          <Button
            variant="destructive"
            onClick={handleClear}
            className="text-sm"
          >
            C
          </Button>

          {/* Scientific Functions */}
          <Button
            variant="outline"
            onClick={() => handleScientific("sin")}
            className="text-sm"
          >
            sin
          </Button>
          <Button
            variant="outline"
            onClick={() => handleScientific("cos")}
            className="text-sm"
          >
            cos
          </Button>
          <Button
            variant="outline"
            onClick={() => handleScientific("tan")}
            className="text-sm"
          >
            tan
          </Button>
          <Button
            variant="outline"
            onClick={() => handleScientific("log")}
            className="text-sm"
          >
            log
          </Button>
          <Button
            variant="outline"
            onClick={() => handleScientific("ln")}
            className="text-sm"
          >
            ln
          </Button>

          {/* Additional Functions */}
          <Button
            variant="outline"
            onClick={() => handleScientific("sqrt")}
            className="text-sm"
          >
            √
          </Button>
          <Button
            variant="outline"
            onClick={() => handleScientific("square")}
            className="text-sm"
          >
            x²
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOperator("(")}
            className="text-sm"
          >
            (
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOperator(")")}
            className="text-sm"
          >
            )
          </Button>
          <Button
            variant="outline"
            onClick={() => handleScientific("factorial")}
            className="text-sm"
          >
            n!
          </Button>

          {/* Numbers and Basic Operators */}
          <Button onClick={() => handleNumber("7")}>7</Button>
          <Button onClick={() => handleNumber("8")}>8</Button>
          <Button onClick={() => handleNumber("9")}>9</Button>
          <Button variant="secondary" onClick={() => handleOperator("/")}>
            ÷
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsRadians((prev) => !prev)}
          >
            {isRadians ? "RAD" : "DEG"}
          </Button>

          <Button onClick={() => handleNumber("4")}>4</Button>
          <Button onClick={() => handleNumber("5")}>5</Button>
          <Button onClick={() => handleNumber("6")}>6</Button>
          <Button variant="secondary" onClick={() => handleOperator("*")}>
            ×
          </Button>
          <Button variant="outline" onClick={() => handleOperator("Math.PI")}>
            π
          </Button>

          <Button onClick={() => handleNumber("1")}>1</Button>
          <Button onClick={() => handleNumber("2")}>2</Button>
          <Button onClick={() => handleNumber("3")}>3</Button>
          <Button variant="secondary" onClick={() => handleOperator("-")}>
            -
          </Button>
          <Button variant="outline" onClick={() => handleOperator("Math.E")}>
            e
          </Button>

          <Button onClick={() => handleNumber("0")}>0</Button>
          <Button onClick={() => handleOperator(".")}>.</Button>
          <Button variant="secondary" onClick={() => handleOperator("%")}>
            %
          </Button>
          <Button variant="secondary" onClick={() => handleOperator("+")}>
            +
          </Button>
          <Button variant="primary" onClick={handleEqual}>
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

