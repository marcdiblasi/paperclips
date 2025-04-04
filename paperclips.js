var qTimer = 0;
f = function () {
  if (document.getElementById("powerDiv").style.display != "") {
    if (!btnMakePaperclipElement.disabled) {
      clipClick(1);
    }

    if (wire < 1000 && funds > wireCost) {
      buyWire();
    }

    if (
      unsoldClips > clipRate * 10 &&
      margin > 0.03 &&
      Math.random() * 10 < 1
    ) {
      lowerPrice();
    }

    if (unsoldClips < 1 || Math.random() * 1000 < 1) {
      raisePrice();
    }

    if (
      funds > adCost + wireCost * 2 &&
      !document.getElementById("btnExpandMarketing").disabled
    ) {
      buyAds();
    }

    if (
      !document.getElementById("btnMakeClipper").disabled &&
      clipmakerLevel < 75 &&
      funds > wireCost * 2
    ) {
      makeClipper();
    }

    if (
      !document.getElementById("btnMakeMegaClipper").disabled &&
      megaClipperLevel < 75 &&
      funds > wireCost * 2
    ) {
      makeMegaClipper();
    }

    if (investmentEngineFlag) {
      if (portTotal < funds / 10) {
        investDeposit();
      }

      if (bankroll > 100000000 && bankroll > secTotal) {
        investWithdraw();
      }
    }

    if (
      !document.getElementById("btnImproveInvestments").disabled &&
      investLevel < 8
    ) {
      investUpgrade();

      if (investLevel < 3) {
        document.getElementById("investStrat").selectedIndex = 0;
      } else if (investLevel < 5) {
        document.getElementById("investStrat").selectedIndex = 1;
      } else {
        document.getElementById("investStrat").selectedIndex = 2;
      }
    }
  }

  // Stage 2
  if (document.getElementById("powerDiv").style.display == "") {
    powerConsumption = parseInt(
      powerConsumptionRateElement.innerHTML.replace(",", ""),
    );
    powerProduction = parseInt(
      powerProductionRateElement.innerHTML.replace(",", ""),
    );

    if (
      powerProduction - 200 < powerConsumption &&
      !btnMakeFarmElement.disabled
    ) {
      makeFarm(1);
    }

    if (harvesterLevel == 0) {
      makeHarvester(1);
    }

    if (
      powerProduction > powerConsumption &&
      Math.pow(factoryLevel, 1.7) * 12 > harvesterLevel &&
      !btnMakeHarvesterElement.disabled
    ) {
      if (harvesterLevel < 1000) {
        makeHarvester(1);
      } else if (harvesterLevel < 10000) {
        makeHarvester(10);
      } else {
        makeHarvester(100);
      }
    }

    if (!btnEntertainSwarmElement.disabled) {
      entertainSwarm();
    }

    if (wireDroneLevel == 0) {
      makeWireDrone(1);
    }

    if (
      powerProduction > powerConsumption &&
      wireDroneLevel < harvesterLevel * 1.35 &&
      !btnMakeWireDroneElement.disabled
    ) {
      if (wireDroneLevel < 1000) {
        makeWireDrone(1);
      } else if (wireDroneLevel < 1000) {
        makeWireDrone(10);
      } else {
        makeWireDrone(100);
      }
    }

    if (availableMatter == 0 && acquiredMatter == 0 && wire == 0) {
      // Stage 2b (trying to get to stage 3)
      if (factoryLevel > 0) {
        factoryReboot();
      }

      if (batteryLevel < 1000) {
        makeBattery(1);
      }

      if (storedPower < 10000000 && farmLevel < 10000) {
        makeFarm(1);
      }

      if (swarmSliderDivElement.style.display == "") {
        if (parseInt(sliderElement.value) != 200) {
          sliderElement.value = 200;
        }
      }
    } else {
      // Stage 2a
      if (
        (powerProduction - 200 >= powerConsumption || factoryLevel < 1) &&
        !btnMakeFactoryElement.disabled
      ) {
        makeFactory();
      }

      if (swarmSliderDivElement.style.display == "") {
        if (parseInt(sliderElement.value) != 100) {
          sliderElement.value = 100;
        }
      }
    }

    if (farmLevel * 2 > batteryLevel && batteryLevel <= 1000) {
      makeBattery(1);
    }
  }

  // Stage 3
  if (probeDesignDivElement.style.display == "") {
    makeProbe();

    if (!btnEntertainSwarmElement.disabled) {
      entertainSwarm();
    }

    if (swarmSliderDivElement.style.display == "") {
      if (parseInt(sliderElement.value) != 150) {
        sliderElement.value = 150;
      }
    }

    if (!btnIncreaseProbeTrustElement.disabled) {
      increaseProbeTrust();
    }

    if (!btnIncreaseMaxTrustElement.disabled) {
      increaseMaxTrust();
    }

    targets = {};
    if (combatButtonDivElement.style.display != "") {
      // Pre-combat
      targets = {
        Speed: 2,
        Nav: 2,
        Rep: 3,
        Haz: 10,
        Fac: 1,
        Harv: 1,
        Wire: 1,
        Combat: 0,
      };
    } else {
      // Post-combat
      if (maxTrust <= 20) {
        targets = {
          Speed: 0,
          Nav: 0,
          Rep: 3,
          Haz: 8,
          Fac: 0,
          Harv: 0,
          Wire: 0,
          Combat: 9,
        };
      } else if (maxTrust <= 30) {
        targets = {
          Speed: 2,
          Nav: 2,
          Rep: 3,
          Haz: 10,
          Fac: 1,
          Harv: 1,
          Wire: 1,
          Combat: 10,
        };
      } else if (maxTrust <= 40) {
        targets = {
          Speed: 3,
          Nav: 3,
          Rep: 11,
          Haz: 10,
          Fac: 1,
          Harv: 1,
          Wire: 1,
          Combat: 10,
        };
      } else {
        targets = {
          Speed: 5,
          Nav: 5,
          Rep: 20,
          Haz: 10,
          Fac: 1,
          Harv: 1,
          Wire: 1,
          Combat: 10,
        };
      }
    }

    // Increases
    if (probeTrust > probeUsedTrust) {
      if (probeHaz < targets["Haz"]) {
        raiseProbeHaz();
      }

      if (probeCombat < targets["Combat"]) {
        raiseProbeCombat();
      }

      if (probeRep < targets["Rep"]) {
        raiseProbeRep();
      }

      if (probeSpeed < targets["Speed"]) {
        raiseProbeSpeed();
      }

      if (probeNav < targets["Nav"]) {
        raiseProbeNav();
      }

      if (probeFac < targets["Fac"]) {
        raiseProbeFac();
      }

      if (probeHarv < targets["Harv"]) {
        raiseProbeHarv();
      }

      if (probeWire < targets["Wire"]) {
        raiseProbeWire();
      }
    }

    // Reductions
    if (probeHaz > targets["Haz"]) {
      lowerProbeHaz();
    }

    if (probeCombat > targets["Combat"]) {
      lowerProbeCombat();
    }

    if (probeRep > targets["Rep"]) {
      lowerProbeRep();
    }

    if (probeSpeed > targets["Speed"]) {
      lowerProbeSpeed();
    }

    if (probeNav > targets["Nav"]) {
      lowerProbeNav();
    }

    if (probeFac > targets["Fac"]) {
      lowerProbeFac();
    }

    if (probeHarv > targets["Harv"]) {
      lowerProbeHarv();
    }

    if (probeWire > targets["Wire"]) {
      lowerProbeWire();
    }
  }

  // Universal
  projs = document.getElementById("projectListTop").children;
  for (let i = 0; i < projs.length; i++) {
    if (
      !projs[i].disabled &&
      projs[i].id !== "projectButton217" &&
      projs[i].id !== "projectButton200" &&
      projs[i].id !== "projectButton201"
    ) {
      projs[i].click();

      setTimeout(f, 20);
      return;
    }
  }

  if (document.getElementById("strategyEngine").style.display == "") {
    if (!document.getElementById("btnNewTournament").disabled) {
      newTourney();
    }

    picker = document.getElementById("stratPicker");
    if (picker.selectedIndex != picker.options.length - 1) {
      picker.selectedIndex = picker.options.length - 1;
    }

    if (!document.getElementById("btnRunTournament").disabled) {
      runTourney();
    }
  }

  if (!btnAddProcElement.disabled) {
    if (processors + memory < 6) {
      if (processors >= memory) {
        addMem();
      } else {
        addProc();
      }
    } else if (processors + memory < 12) {
      addMem();
    } else if (processors + memory < 20) {
      if (processors < 5) {
        addProc();
      } else {
        addMem();
      }
    } else if (memory < 70) {
      addMem();
    } else if (memory < 300) {
      addMem();
      addProc();
    } else {
      addProc();
    }
  }

  if (qChipCost > 10000) {
    if (qTimer <= 0) {
      qComp();
      qTimer += 100;

      if (parseInt(qCompDisplay.innerHTML.slice(6).replace(",", "")) > 10) {
        qTimer = 3;
      } else {
        qTimer = 150;
      }
    } else {
      qTimer -= 1;
    }
  }

  setTimeout(f, 20);
};
f();
