<script>

  import { Age, Sex } from "$lib/enum";
  import { getRandomSSN } from "$lib/ssn";

  let selectedAgeOption = Age.Range;
  let selectedSexOption = Sex.Random;

  let selectedExactAge = 18;
  let selectedMinAge = 0;
  let selectedMaxAge = 65;
  let selectedCount = 1;
  let ssnList = [];

  const onFormSubmit = () => {
    ssnList = [];
    for (let i = 0; i < selectedCount; i++) {
      const ssn = getRandomSSN(selectedAgeOption, selectedSexOption, {
        exactAge: selectedExactAge,
        minAge: selectedMinAge,
        maxAge: selectedMaxAge,
      });
      ssnList.push(ssn);
    }
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
                <input type="radio" bind:group={selectedAgeOption} value={Age.Range} />
                Between
              </div>
            </td>
            <td>
              {#if selectedAgeOption === Age.Random}
                <span>TODO: Display age range dynamically</span>
              {:else if selectedAgeOption === Age.Exact}
                <input type="number" min="0" max={130} placeholder="Age" bind:value={selectedExactAge} />
              {:else if selectedAgeOption === Age.Range}
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
    <pre>{#each ssnList as ssn}{ssn + "\n"}{/each}</pre>
  </div>
  <br>
</main>


<style>

  pre {
    font-size: 1.5em;
  }

</style>