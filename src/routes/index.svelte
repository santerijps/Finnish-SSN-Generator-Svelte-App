<script>

  import { Age, Sex } from "$lib/enum";
  import { RandomSSN } from "$lib/ssn";

  const copyButtonTextDefault = "Copy values to clipboard";
  const copyButtonTextDone = "Saved to clipboard!";

  let selectedAgeOption = Age.Random;
  let selectedSexOption = Sex.Random;

  let selectedExactAge = 35;
  let selectedMinAge = 18;
  let selectedMaxAge = 65;
  let selectedCount = 1;
  let ssnList = [];
  let copyButtonText = copyButtonTextDefault;

  const onFormSubmit = async () => {
    let ssnFunction = null;
    switch (selectedAgeOption) {
      case Age.Random:
        ssnFunction = () => RandomSSN.between(0, 120, selectedSexOption);
        break;
      case Age.Exact:
        ssnFunction = () => RandomSSN.is(selectedExactAge, selectedSexOption);
        break;
      case Age.Between:
        selectedMinAge = Math.min(selectedMinAge, selectedMaxAge);
        ssnFunction = () => RandomSSN.between(selectedMinAge, selectedMaxAge, selectedSexOption);
        break;
      default:
        console.error("Unhandled ageOption case: " + selectedAgeOption);
    }
    ssnList = [];
    for (let i = 0; i < selectedCount; i++) {
      ssnList.push(ssnFunction());
    }
  };

  const copySsnList = async () => {
    const text = ssnList.join("\n");
    await navigator.clipboard.writeText(text);
    copyButtonText = copyButtonTextDone;
    setTimeout(() => copyButtonText = copyButtonTextDefault, 5000);
  };

</script>


<svelte:head>
  <title>Finnish SSN Generator</title>
  <meta name="description" content="Generate Finnish social security numbers easily!" />
</svelte:head>


<main>
  <h1>Finnish SSN Generator</h1>
  <form on:submit|preventDefault={onFormSubmit}>
    <fieldset>
      <legend>Options</legend>
      <table>
        <tbody>
          <tr>
            <td>Age</td>
            <td>
              <div>
                <input type="radio" bind:group={selectedAgeOption} value={Age.Random} />
                Random
              </div>
              <div>
                <input type="radio" bind:group={selectedAgeOption} value={Age.Exact} />
                Exact
              </div>
              <div>
                <input type="radio" bind:group={selectedAgeOption} value={Age.Between} />
                Between
              </div>
            </td>
            <td>
              {#if selectedAgeOption === Age.Random}
                <span>Ages 0 - 120</span>
              {:else if selectedAgeOption === Age.Exact}
                <input type="number" min="0" max={130} placeholder="Age" bind:value={selectedExactAge} />
              {:else if selectedAgeOption === Age.Between}
                <input type="number" min="0" max={130} placeholder="Min" bind:value={selectedMinAge} />
                ━
                <input type="number" min="0" max={130} placeholder="Max" bind:value={selectedMaxAge} />
              {/if}
            </td>
          </tr>
          <tr>
            <td>Sex</td>
            <td>
              <select bind:value={selectedSexOption}>
                <option value={Sex.Random}>Random</option>
                <option value={Sex.Male}>Male</option>
                <option value={Sex.Female}>Female</option>
              </select>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Count</td>
            <td>
              <input type="number" min="1" placeholder="Count" bind:value={selectedCount} />
            </td>
            <td>
              <button type="submit">Generate SSN</button>
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  </form>
  <div align="center">
    {#if ssnList.length > 0}
      <br/>
      <button on:click={copySsnList}>{copyButtonText}</button>
      <pre>{#each ssnList as ssn}{ssn + "\n"}{/each}</pre>
    {/if}
  </div>
  <br>
</main>


<style>

  pre {
    font-size: 1.5em;
  }

</style>